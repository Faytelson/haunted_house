import * as THREE from "three";
import { loadScene, getMeshesFromScene, createInstancedMeshes } from "../createInstancedMesh.js";

// forest trees
const forest = new THREE.Group();

const forestTreesScene = await loadScene("models/forest_trees/scene.gltf");
const forestTreesMeshes = getMeshesFromScene(forestTreesScene);
const filteredForestTreesMeshes = forestTreesMeshes.filter(
  (mesh) => mesh.name !== "SM_FreeTree_07_Free_Tree_M_0" && mesh.name !== "SM_FreeTree_04_Free_Tree_M_0",
);
const instancedForestTreesArray = createInstancedMeshes(
  {
    countInRow: 19,
    countInColumn: 10,
    stepInRow: 10,
    stepInColumn: 15,
    rangeInRow: 5,
    rangeInColumn: 6,
    scale: 0.02,
  },
  filteredForestTreesMeshes,
);
const forestTreesGroup = new THREE.Group();
instancedForestTreesArray.forEach((instancedMesh) => {
  forestTreesGroup.add(instancedMesh);
});

forestTreesGroup.position.x = -40;
forestTreesGroup.position.z = -170;
forestTreesGroup.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true;
    child.scale.y = Math.random() * 0.5 + 0.8;
  }
});
forest.add(forestTreesGroup);

export { forest };
