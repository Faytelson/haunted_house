import * as THREE from "three";
import { createGardenBed } from "./gardenBedFactory.js";
import { fenceWidth } from "../fence.js";
import {
  loadScene,
  getMeshesFromScene,
  createInstancedMeshes,
} from "../../../createInstancedMesh.js";

const gardenBedRibbonGrass = new THREE.Group();
// garden bed
// оффсеты чтобы грядка не касалась забора
const offsetX = 0.6;
const offsetZ = 1;
const width = 13;
const length = 11;

const options = {
  width: width,
  length: length,
  segmentsX: 70,
  segmentsY: 70,
  x: width / 2 - fenceWidth / 2 + offsetX,
  z: -(length / 2 - fenceWidth / 2 + offsetZ),
};
const gardenBed = createGardenBed(options);
gardenBedRibbonGrass.add(gardenBed);

// plants
const scene = await loadScene("models/ribbon_grass/tbdpec3r_tier_3.gltf");
const meshes = getMeshesFromScene(scene);
const instanced = createInstancedMeshes(
  {
    countInRow: 8,
    countInColumn: 12,
    stepInRow: 1.6,
    stepInColumn: 1,
    rangeInRow: 0.6,
    rangeInColumn: 0.4,
    scale: 0.02,
    rotation: new THREE.Euler(Math.PI / 2, 0, 0),
  },
  meshes,
);
const group = new THREE.Group();
instanced.forEach((instancedMesh) => {
  group.add(instancedMesh);
});
group.position.x = gardenBed.position.x - width / 2 + 1;
group.position.y = 0.25;
group.position.z = gardenBed.position.z - length / 2 + 0.5;
gardenBedRibbonGrass.add(group);

gardenBedRibbonGrass.traverse((child) => {
  if (child.isMesh) {
    child.receiveShadow = true;
  }
});

export { gardenBedRibbonGrass };