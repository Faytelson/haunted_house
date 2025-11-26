import * as THREE from "three";
import { createGardenBed, gardenBedMDWidth, gardenBedMDLength } from "./gardenBedFactory";
import { fenceWidth } from "../fence";
import { loadScene, getMeshesFromScene, createInstancedMeshes } from "../../createInstancedMesh.js";

const gardenBedMD2Group = new THREE.Group();
// garden bed
// оффсеты чтобы грядка не касалась забора
const offsetX = 0.6;
const offsetZ = 1;

const options = {
  width: gardenBedMDWidth,
  length: gardenBedMDLength,
  segmentsX: 70,
  segmentsY: 70,
  x: gardenBedMDWidth / 2 - fenceWidth / 2 + offsetX,
  z: -(gardenBedMDLength / 2 - fenceWidth / 2 + offsetZ + gardenBedMDLength + 1),
};
const gardenBedMD2 = createGardenBed(options);
gardenBedMD2Group.add(gardenBedMD2);

gardenBedMD2Group.traverse((child) => {
  if (child.isMesh) {
    child.receiveShadow = true;
  }
});

// wheat
const ribbonGrassScene = await loadScene("models/ribbon_grass/tbdpec3r_tier_3.gltf");
const ribbonGrassMeshes = getMeshesFromScene(ribbonGrassScene);
const instancedRibbonGrassArray = createInstancedMeshes(
  {
    countInRow: 15,
    countInColumn: 6,
    stepInRow: 0.8,
    stepInColumn: 1,
    rangeInRow: 0.6,
    rangeInColumn: 0.4,
    scale: 0.02,
    rotation: new THREE.Euler(Math.PI / 2, 0, 0),
  },
  ribbonGrassMeshes,
);
const ribbonGrassGroup = new THREE.Group();
instancedRibbonGrassArray.forEach((instancedMesh) => {
  ribbonGrassGroup.add(instancedMesh);
});
gardenBedMD2Group.add(ribbonGrassGroup);
ribbonGrassGroup.position.x = gardenBedMD2.position.x - gardenBedMDWidth / 2 + 1;
ribbonGrassGroup.position.y = 0.25;
ribbonGrassGroup.position.z = gardenBedMD2.position.z - gardenBedMDLength / 2 + 0.5;
export { gardenBedMD2Group };
