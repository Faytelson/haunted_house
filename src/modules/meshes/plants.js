import * as THREE from "three";
import { gltfLoader } from "../loaders";

// trees group
const treesGroupGltf = await gltfLoader.loadAsync("models/trees_group/scene.gltf");
const treesGroup = treesGroupGltf.scene;
treesGroup.scale.set(4, 4, 4);
treesGroup.position.x = -10;
treesGroup.position.z = -30;
treesGroup.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true;
  }
});

// plants
const plantsGltf = await gltfLoader.loadAsync("models/plant_outdoors/scene.gltf");
const plants = plantsGltf.scene;

let plantMesh;
plants.traverse((child) => {
  if (child.isMesh && !plantMesh) plantMesh = child;
});
const countPlantsX = 16;
const countPlantsZ = 13;
const totalPlants = countPlantsX * countPlantsZ;
const instancedPlants = new THREE.InstancedMesh(
  plantMesh.geometry,
  plantMesh.material,
  totalPlants,
);

const dummyPlant = new THREE.Object3D();
let matrixPlantCounter = 0;

const plantStepX = 1.2;
const plantStepZ = 2.2;

for (let x = 0; x < countPlantsX; x++) {
  for (let z = 0; z < countPlantsZ; z++) {
    const offsetX = (Math.random() - 0.5) * 0.6;
    const offsetZ = (Math.random() - 0.5) * 0.4;
    dummyPlant.position.set(x * plantStepX + offsetX, 0, z * plantStepZ + offsetZ);
    dummyPlant.scale.set(0.2, 0.2, 0.2);
    dummyPlant.rotation.set(-Math.PI / 2, 0, 0);
    dummyPlant.updateMatrix();
    instancedPlants.setMatrixAt(matrixPlantCounter++, dummyPlant.matrix);
  }
}
instancedPlants.castShadow = true;
instancedPlants.receiveShadow = true;
instancedPlants.instanceMatrix.needsUpdate = true;
instancedPlants.position.x = 5;
instancedPlants.position.y = 0.2;
instancedPlants.position.z = -4;

// tree
const treeGltf = await gltfLoader.loadAsync("models/tree/scene.gltf");
const tree = treeGltf.scene;
tree.position.x = -21;
tree.position.z = -20;
tree.scale.set(0.2, 0.2, 0.2);
tree.castShadow = true;

// wheat
const wheatGltf = await gltfLoader.loadAsync("models/wheat_grass/tdcrdbur_tier_3.gltf");
const wheat = wheatGltf.scene;
let wheatMesh;
wheat.traverse((child) => {
  if (child.isMesh && !wheatMesh) wheatMesh = child;
});
const countWheatX = 20;
const countWheatZ = 20;
const totalWheat = countWheatX * countWheatZ;
const instancedWheat = new THREE.InstancedMesh(wheatMesh.geometry, wheatMesh.material, totalWheat);

const dummyWheat = new THREE.Object3D();
let matrixWheatCounter = 0;

const wheatStepX = 0.4;
const wheatStepZ = 0.9;

for (let x = 0; x < countWheatX; x++) {
  for (let z = 0; z < countWheatZ; z++) {
    const offsetX = (Math.random() - 0.5) * 0.6;
    const offsetZ = (Math.random() - 0.5) * 0.4;
    dummyWheat.position.set(x * wheatStepX + offsetX, 0, z * wheatStepZ + offsetZ);
    dummyWheat.scale.set(0.01, 0.01, 0.01);
    dummyWheat.rotation.set(Math.PI / 2, 0, 0);
    dummyWheat.updateMatrix();
    instancedWheat.setMatrixAt(matrixWheatCounter++, dummyWheat.matrix);
  }
}
instancedWheat.castShadow = true;
instancedWheat.receiveShadow = true;
instancedWheat.instanceMatrix.needsUpdate = true;
instancedWheat.rotation.set(0, Math.PI / 2, 0);
instancedWheat.position.x = -25 + 2.2;
instancedWheat.position.z = 25 - 2;

export { treesGroup, instancedPlants, tree, instancedWheat };
