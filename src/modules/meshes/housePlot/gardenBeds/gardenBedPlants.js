import * as THREE from "three";
import { createGardenBed } from "./gardenBedFactory.js";
import { fenceWidth } from "../fence.js";
import {
  loadScene,
  getMeshesFromScene,
  createInstancedMeshes,
} from "../../../createInstancedMesh.js";

const gardenBedPlants = new THREE.Group();

// garden bed
// оффсеты чтобы грядка не касалась забора
const offsetX = 0.3;
const offsetZ = 0.3;
const width = 13;
const length = 22;
const gardenBedPlantsLength = length;

const options = {
  width: width,
  length: length,
  segmentsX: 200,
  segmentsY: 200,
  x: -width / 2 + fenceWidth / 2 - offsetX,
  z: -(length / 2 - fenceWidth / 2 + offsetZ),
};
const gardenBed = createGardenBed(options);
gardenBedPlants.add(gardenBed);

// plants
const scene = await loadScene("models/lily_of_the_valley/xikkdhjja_tier_3.gltf");
const meshes = getMeshesFromScene(scene);
const instanced = createInstancedMeshes(
  {
    countInRow: 10,
    countInColumn: 10,
    stepInRow: 1.2,
    stepInColumn: 2.2,
    rangeInRow: 0.6,
    rangeInColumn: 0.4,
    scale: 0.02,
    // rotation: new THREE.Euler(-Math.PI / 2, 0, 0),
  },
  meshes,
);
const group = new THREE.Group();
instanced.forEach((instancedMesh) => {
  group.add(instancedMesh);
});
// 1 - offset от края грядки по x
group.position.x = gardenBed.position.x - width / 2 + 1;
// 1.5 - offset от края грядки по z
group.position.z = gardenBed.position.z - length / 2 + 1.5;

gardenBedPlants.add(group);

gardenBedPlants.traverse((child) => {
  if (child.isMesh) {
    child.receiveShadow = true;
  }
});

export { gardenBedPlants, meshes, gardenBedPlantsLength };
