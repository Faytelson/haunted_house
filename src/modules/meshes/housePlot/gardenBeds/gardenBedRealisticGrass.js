// import * as THREE from "three";
// import { createGardenBed } from "./gardenBedFactory.js";
// import { fenceWidth } from "../fence.js";
// import { loadScene, getMeshesFromScene, createInstancedMeshes } from "../../../createInstancedMesh.js";

// const gardenBedRealisticGrass = new THREE.Group();
// garden bed
// оффсеты чтобы грядка не касалась забора
// const offsetX = 0.4;
// const offsetZ = 1;
const spaceBetween = 3;
const width = 13;
const length = 9;

const options = {
  width: width,
  length: length,
  segmentsX: 70,
  segmentsY: 70,
  x: width / 2 - fenceWidth / 2 + offsetX,
  z: -(length / 2 - fenceWidth / 2 + 11 + offsetZ + spaceBetween),
};
const gardenBed = createGardenBed(options);
gardenBedRealisticGrass.add(gardenBed);

// grass
const scene = await loadScene("models/realistic_grass/scene.gltf");
const meshes = getMeshesFromScene(scene);
const instanced = createInstancedMeshes(
  {
    countInRow: 7,
    countInColumn: 5,
    stepInRow: 2.4,
    stepInColumn: 1.8,
    rangeInRow: 0.6,
    rangeInColumn: 0.4,
    scale: 2,
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
gardenBedRealisticGrass.add(group);

gardenBedRealisticGrass.traverse((child) => {
  if (child.isMesh) {
    child.receiveShadow = true;
  }
});

export { gardenBedRealisticGrass };
