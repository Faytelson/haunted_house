import * as THREE from "three";
import { createGardenBed, gardenBedMDWidth, gardenBedMDLength } from "./gardenBedFactory";
import { fenceWidth } from "../fence";
import { loadScene, getMeshesFromScene, createInstancedMeshes } from "../../../createInstancedMesh.js";

const gardenBedMD3Group = new THREE.Group();
// garden bed
// оффсеты чтобы грядка не касалась забора
const offsetX = 0.4;
const offsetZ = 1;

const options = {
  width: gardenBedMDWidth,
  length: gardenBedMDLength,
  segmentsX: 70,
  segmentsY: 70,
  x: gardenBedMDWidth / 2 - fenceWidth / 2 + offsetX,
  z: -(gardenBedMDLength / 2 - fenceWidth / 2 + offsetZ + 2 * (gardenBedMDLength + 1) + 1),
};
const gardenBedMD3 = createGardenBed(options);
gardenBedMD3Group.add(gardenBedMD3);

gardenBedMD3Group.traverse((child) => {
  if (child.isMesh) {
    child.receiveShadow = true;
  }
});

// wheat
const grassVegetationScene = await loadScene("models/realistic_grass/scene.gltf");
const grassVegetationMeshes = getMeshesFromScene(grassVegetationScene);
const instancedGrassVegetationArray = createInstancedMeshes(
  {
    countInRow: 10,
    countInColumn: 5,
    stepInRow: 1.2,
    stepInColumn: 1.2,
    rangeInRow: 0.6,
    rangeInColumn: 0.4,
    scale: 2,
  },
  grassVegetationMeshes,
);
const grassVegetationGroup = new THREE.Group();
instancedGrassVegetationArray.forEach((instancedMesh) => {
  grassVegetationGroup.add(instancedMesh);
});
gardenBedMD3Group.add(grassVegetationGroup);
grassVegetationGroup.position.x = gardenBedMD3.position.x - gardenBedMDWidth / 2 + 1;
grassVegetationGroup.position.y = 0.25;
grassVegetationGroup.position.z = gardenBedMD3.position.z - gardenBedMDLength / 2 + 0.5;
export { gardenBedMD3Group };
