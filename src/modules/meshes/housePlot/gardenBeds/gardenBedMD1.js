import * as THREE from "three";
import { createGardenBed, gardenBedMDWidth, gardenBedMDLength } from "./gardenBedFactory";
import { fenceWidth } from "../fence";
import { loadScene, getMeshesFromScene, createInstancedMeshes } from "../../../createInstancedMesh.js";

const gardenBedMD1Group = new THREE.Group();
// garden bed
// оффсеты чтобы грядка не касалась забора
const offsetX = 0.6;
const offsetZ = 1;

const options = {
  width: gardenBedMDWidth,
  length: gardenBedMDLength,
  segmentsX: 100,
  segmentsY: 100,
  x: gardenBedMDWidth /2 - fenceWidth / 2 + offsetX,
  z: -(gardenBedMDLength /2 - fenceWidth / 2 + offsetZ),
};
const gardenBedMD1 = createGardenBed(options);
gardenBedMD1Group.add(gardenBedMD1);

gardenBedMD1Group.traverse((child) => {
  if (child.isMesh) {
    child.receiveShadow = true;
  }
});

// wheat
const wheatScene = await loadScene("models/wheat_grass/tdcrdbur_tier_3.gltf");
const wheatMeshes = getMeshesFromScene(wheatScene);
const instancedWheatArray = createInstancedMeshes(
  {
    countInRow: 20,
    countInColumn: 6,
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
gardenBedMD1Group.add(wheatGroup);
wheatGroup.position.x = gardenBedMD1.position.x - gardenBedMDWidth / 2 + 1;
wheatGroup.position.z = gardenBedMD1.position.z - gardenBedMDLength / 2 + 0.5;
export { gardenBedMD1Group };