import * as THREE from "three";
import { fenceWidth } from "./fence.js";
import { loadScene, getMeshesFromScene, createInstancedMeshes } from "../createInstancedMesh.js";

// tree
const treeScene = await loadScene("models/tree/scene.gltf");
treeScene.position.x = -13;
treeScene.position.z = 2;
treeScene.scale.set(0.2, 0.2, 0.2);
treeScene.castShadow = true;

function cloneTreeScene(scene) {
  const clone = scene.clone(true);

  clone.traverse((obj) => {
    if (obj.isMesh && obj.material) {
      obj.material = obj.material.clone();
    }
  });

  return clone;
}

const treeGroup = new THREE.Group();
const tree1 = cloneTreeScene(treeScene);
tree1.position.x = 0;
tree1.position.z = 0;
tree1.scale.set(0.25, 0.25, 0.25);
treeGroup.add(tree1);

const tree2 = cloneTreeScene(treeScene);
tree2.position.x = 3;
tree2.position.z = 2;
tree2.scale.set(0.18, 0.18, 0.18);
treeGroup.add(tree2);

const tree3 = cloneTreeScene(treeScene);
tree3.position.x = 1;
tree3.position.z = 3;
tree3.scale.set(0.22, 0.22, 0.22);
treeGroup.add(tree3);
treeGroup.position.x = -fenceWidth / 2 + 1;
treeGroup.position.z = -15;

// trees
const forestTreesScene1 = await loadScene("models/lodbillboard_summer_trees_pack/scene.gltf");
forestTreesScene1.scale.set(0.4, 0.4, 0.4);
forestTreesScene1.position.x = -10;
forestTreesScene1.position.z = -25;
forestTreesScene1.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true;
  }
});

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

export { treeScene, treeGroup, forestTreesScene1, kalmiaBushGroup };
