import * as THREE from "three";
import { gltfLoader } from "../loaders";

// trees group
const trees_group_gltf = await gltfLoader.loadAsync("models/trees_group/scene.gltf");
const trees_group = trees_group_gltf.scene;
trees_group.scale.set(4, 4, 4);
trees_group.position.x = -4;
trees_group.position.z = -7;

// plant outdoors
const plant_outdoors_gltf = await gltfLoader.loadAsync("models/plant_outdoors/scene.gltf");
const plant_outdoors = plant_outdoors_gltf.scene;
// plant_outdoors.scale.set(0.01, 0.01, 0.01);
// plant_outdoors.position.x = 5;
// plant_outdoors.position.z = 20;

let plantMesh;
plant_outdoors.traverse((child) => {
  if (child.isMesh && !plantMesh) plantMesh = child;
});
const countX = 16;
const countZ = 12;
const total = countX * countZ;
const instancedPlants = new THREE.InstancedMesh(plantMesh.geometry, plantMesh.material, total);

const dummy = new THREE.Object3D();
let i = 0;

const stepX = 1.2;
const stepZ = 2.2;

for (let x = 0; x < countX; x++) {
  for (let z = 0; z < countZ; z++) {
    const offsetX = (Math.random() - 0.5) * 0.6;
    const offsetZ = (Math.random() - 0.5) * 0.4;
    dummy.position.set(x * stepX + offsetX, 0, z * stepZ + offsetZ);
    dummy.scale.set(0.2, 0.2, 0.2);
    dummy.rotation.set(-Math.PI / 2, 0, 0);
    dummy.updateMatrix();
    instancedPlants.setMatrixAt(i++, dummy.matrix);
  }
}

export { trees_group, instancedPlants };
