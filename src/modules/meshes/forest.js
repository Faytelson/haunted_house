import * as THREE from "three";
import { loadScene, getMeshesFromScene, createInstancedMeshes } from "../createInstancedMesh.js";

// forest trees
const forest = new THREE.Group();

const forestTreesScene = await loadScene("models/green_bush/scene.gltf");
const forestTreesMeshes = getMeshesFromScene(forestTreesScene);
const instancedForestTreesArray = createInstancedMeshes(
  {
    countInRow: 16,
    countInColumn: 8,
    stepInRow: 6,
    stepInColumn: 20,
    rangeInRow: 5,
    rangeInColumn: 6,
    scale: 6,
    rotation: new THREE.Euler(-Math.PI / 2, 0, 0),
  },
  forestTreesMeshes,
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
  }
});
forest.add(forestTreesGroup);

export { forest };
