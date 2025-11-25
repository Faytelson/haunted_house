import * as THREE from "three";
import { loadScene, getMeshesFromScene, createInstancedMeshes } from "../createInstancedMesh.js";

// tree
const treeScene = await loadScene("models/tree/scene.gltf");
treeScene.position.x = -22;
treeScene.position.z = 5.8;
treeScene.scale.set(0.2, 0.2, 0.2);
treeScene.castShadow = true;

// trees
const treesScene = await loadScene("models/trees_group/scene.gltf");
treesScene.scale.set(4, 4, 4);
treesScene.position.x = -10;
treesScene.position.z = -30;
treesScene.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true;
  }
});

// forest trees
const forestTreesScene = await loadScene("models/trees_and_bush/scene.gltf");
forestTreesScene.scale.set(0.2, 0.2, 0.2);
forestTreesScene.position.x = -15;
forestTreesScene.position.z = -34;
forestTreesScene.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true;
  }
});

// plants
const plantScene = await loadScene("models/plant_outdoors/scene.gltf");
const plantMeshes = getMeshesFromScene(plantScene);
const instancedPlantsArray = createInstancedMeshes(
  {
    countInRow: 16,
    countInColumn: 13,
    stepInRow: 1.2,
    stepInColumn: 2.2,
    rangeInRow: 0.6,
    rangeInColumn: 0.4,
    scale: 0.16,
    rotation: new THREE.Euler(-Math.PI / 2, 0, 0),
  },
  plantMeshes,
);
const plantsGroup = new THREE.Group();
instancedPlantsArray.forEach((instancedMesh) => {
  plantsGroup.add(instancedMesh);
});
plantsGroup.position.x = 5;
plantsGroup.position.y = 0.2;
plantsGroup.position.z = -4;

const instancedPlantsArray2 = createInstancedMeshes(
  {
    countInRow: 6,
    countInColumn: 10,
    stepInRow: 1.2,
    stepInColumn: 2,
    rangeInRow: 0.6,
    rangeInColumn: 0.4,
    scale: 0.16,
    rotation: new THREE.Euler(-Math.PI / 2, 0, 0),
  },
  plantMeshes,
);
const plantsGroup2 = new THREE.Group();
instancedPlantsArray2.forEach((instancedMesh) => {
  plantsGroup2.add(instancedMesh);
});
plantsGroup2.rotateY(Math.PI /2);
plantsGroup2.position.x = -25 + 1.4;
plantsGroup2.position.y = 0.2;
plantsGroup2.position.z = 3.7;

// wheat
const wheatScene = await loadScene("models/wheat_grass/tdcrdbur_tier_3.gltf");
const wheatMeshes = getMeshesFromScene(wheatScene);
const instancedWheatArray = createInstancedMeshes(
  {
    countInRow: 12,
    countInColumn: 20,
    stepInRow: 0.6,
    stepInColumn: 1,
    rangeInRow: 0.6,
    rangeInColumn: 0.4,
    scale: 0.01,
    rotation: new THREE.Euler(Math.PI / 2, 0, 0),
  },
  wheatMeshes,
);
const wheatGroup = new THREE.Group();
instancedWheatArray.forEach((instancedMesh) => {
  wheatGroup.add(instancedMesh);
});
wheatGroup.rotation.set(0, Math.PI / 2, 0);
wheatGroup.position.x = -25 + 2.2;
wheatGroup.position.z = 25 - 1.6;

// kalmia latifolia bushes
const kalmiaBushScene = await loadScene("models/kalmia_latifolia_galaxy/scene.gltf");
const kalmiaBushMeshes = getMeshesFromScene(kalmiaBushScene);
const instancedKalmiaBushArray = createInstancedMeshes(
  {
    countInRow: 2,
    countInColumn: 8,
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
kalmiaBushGroup.position.z = 9.5;

// ribbon grass
const ribbonGrassScene = await loadScene("models/ribbon_grass/tbdpec3r_tier_3.gltf");
const ribbonGrassMeshes = getMeshesFromScene(ribbonGrassScene);
const instancedRibbonGrassArray = createInstancedMeshes(
  {
    countInRow: 12,
    countInColumn: 20,
    stepInRow: 0.6,
    stepInColumn: 1,
    rangeInRow: 0.6,
    rangeInColumn: 0.4,
    scale: 0.01,
    rotation: new THREE.Euler(Math.PI / 2, 0, 0),
  },
  ribbonGrassMeshes,
);
const ribbonGrassGroup = new THREE.Group();
instancedRibbonGrassArray.forEach((instancedMesh) => {
  ribbonGrassGroup.add(instancedMesh);
});
ribbonGrassGroup.rotation.set(0, Math.PI / 2, 0);
ribbonGrassGroup.position.x = -25 + 2;
ribbonGrassGroup.position.y = 0.4;
ribbonGrassGroup.position.z = 25 - 10.6;


// grass vegetation
// const grassVegetationScene = await loadScene("models/grass_vegetation/scene.gltf");
// grassVegetationScene.scale.set(4, 4, 4);
// grassVegetationScene.position.x = 20;
// grassVegetationScene.position.z = -20;
// grassVegetationScene.traverse((child) => {
//   if (child.isMesh) {
//     child.castShadow = true;
//   }
// });

// realistic grass
// const realisticGrassScene = await loadScene("models/realistic_grass/scene.gltf");
// realisticGrassScene.scale.set(4, 4, 4);
// realisticGrassScene.position.x = 15;
// realisticGrassScene.position.z = -15;

export {
  treesScene,
  forestTreesScene,
  plantsGroup,
  plantsGroup2,
  treeScene,
  wheatGroup,
  kalmiaBushGroup,
  ribbonGrassGroup,
};
