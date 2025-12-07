import * as THREE from "three";
import { fenceWidth } from "./fence.js";
import { loadScene, getMeshesFromScene, createInstancedMeshes } from "../../createInstancedMesh.js";
import { cloneScene } from "../../../utils/index.js";
import { forestTreesMeshes } from "../forest.js";

// tree
const treeGroup = new THREE.Group();

forestTreesMeshes.forEach((mesh) => {
  if (mesh.name === "SM_FreeTree_02_Free_Tree_M_0") {
    mesh.position.x = 10;
    mesh.position.z = 6;
    mesh.scale.set(0.01, 0.01, 0.01);
    treeGroup.add(mesh);
  }

  if (mesh.name === "SM_FreeTree_05_Free_Tree_M_0") {
    mesh.position.x = 3;
    mesh.scale.set(0.015, 0.015, 0.015);
    treeGroup.add(mesh);
  }

  if (mesh.name === "SM_FreeTree_06_Free_Tree_M_0") {
    mesh.position.x = -4;
    mesh.position.z = 17;
    mesh.scale.set(0.012, 0.012, 0.012);
    treeGroup.add(mesh);
  }

  if (mesh.name === "SM_FreeTree_07_Free_Tree_M_0") {
    mesh.position.x = -1;
    mesh.position.z = 3;
    mesh.scale.set(0.01, 0.01, 0.01);
    treeGroup.add(mesh);
  }
});

treeGroup.position.x = -fenceWidth / 2 + 1;
treeGroup.position.z = -15;
treeGroup.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true;
  }
});

// bushes
const bushScene = await loadScene("models/green_bush/scene.gltf");
const bushGroup = new THREE.Group();

const bush1 = cloneScene(bushScene);
bush1.position.x = 0;
bush1.position.z = 0;
bush1.scale.set(2, 2, 2);
bushGroup.add(bush1);

const bush2 = cloneScene(bushScene);
bush2.position.x = 7;
bush2.position.z = 2;
bush2.scale.set(2.5, 2.5, 2.5);
bushGroup.add(bush2);

const bush3 = cloneScene(bushScene);
bush3.position.x = 2.5;
bush3.position.z = 2.5;
bush3.scale.set(2.2, 2.2, 2.2);
bushGroup.add(bush3);

const bush4 = cloneScene(bushScene);
bush4.position.x = 4.5;
bush4.position.z = -1;
bush4.scale.set(2, 2, 2);
bushGroup.add(bush4);

bushGroup.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true;
    child.rotation.y = Math.PI;
  }
});
bushGroup.position.x = -fenceWidth / 2 + 4;
bushGroup.position.z = -14;

// grass in the backyard
const berryPlantScene = await loadScene("models/stylized_berry_plant/scene.gltf");
const berryPlantMeshes = getMeshesFromScene(berryPlantScene);
const instancedBerryPlantArray = createInstancedMeshes(
  {
    countInRow: 9,
    countInColumn: 4,
    stepInRow: 4,
    stepInColumn: 2,
    rangeInRow: 2,
    rangeInColumn: 1.5,
    scale: 1,
    rotation: new THREE.Euler(-Math.PI / 2, 0, 0),
  },
  berryPlantMeshes,
);
const berryPlantGroup = new THREE.Group();
instancedBerryPlantArray.forEach((instancedMesh) => {
  berryPlantGroup.add(instancedMesh);
});
berryPlantGroup.position.x = -fenceWidth / 2 + 1.8;
berryPlantGroup.position.z = -fenceWidth / 2 + 3.5;

// grass in the front yard
const instancedGrassArray = createInstancedMeshes(
  {
    countInRow: 2,
    countInColumn: 7,
    stepInRow: 6,
    stepInColumn: 1.5,
    rangeInRow: 0.4,
    rangeInColumn: 0.6,
    scale: 0.8,
    rotation: new THREE.Euler(-Math.PI / 2, 0, 0),
  },
  berryPlantMeshes,
);
const grassGroup = new THREE.Group();
instancedGrassArray.forEach((instancedMesh) => {
  grassGroup.add(instancedMesh);
});
grassGroup.position.x = -3;
grassGroup.position.z = 6.5;

// kalmia latifolia bushes
const kalmiaBushScene = await loadScene("models/kalmia_latifolia_galaxy/scene.gltf");
const kalmiaBushMeshes = getMeshesFromScene(kalmiaBushScene);
const instancedKalmiaBushArray = createInstancedMeshes(
  {
    countInRow: 2,
    countInColumn: 5,
    stepInRow: 3,
    stepInColumn: 2,
    rangeInRow: 0.4,
    rangeInColumn: 0.4,
    scale: 0.01,
  },
  kalmiaBushMeshes,
);
const kalmiaBushGroup = new THREE.Group();
instancedKalmiaBushArray.forEach((instancedMesh) => {
  kalmiaBushGroup.add(instancedMesh);
});
kalmiaBushGroup.position.x = -1.6;
kalmiaBushGroup.position.z = 8;

export { treeGroup, bushGroup, berryPlantGroup, grassGroup, kalmiaBushGroup };
