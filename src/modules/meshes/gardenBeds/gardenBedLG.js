import * as THREE from "three";
import { createGardenBed, gardenBedLGWidth, gardenBedLGLength } from "./gardenBedFactory";
import { fenceWidth } from "../fence";
import { loadScene, getMeshesFromScene, createInstancedMeshes } from "../../createInstancedMesh.js";

const gardenBedLGGroup = new THREE.Group();

// garden bed
// оффсеты чтобы грядка не касалась забора
const offsetX = 0.3;
const offsetZ = 0.3;

const options = {
  width: gardenBedLGWidth,
  length: gardenBedLGLength,
  segmentsX: 200,
  segmentsY: 200,
  x: -gardenBedLGWidth / 2 + fenceWidth / 2 - offsetX,
  z: -(gardenBedLGLength / 2 - fenceWidth / 2 + offsetZ),
};
const gardenBedLG = createGardenBed(options);

gardenBedLGGroup.add(gardenBedLG);

// plants
const plantScene = await loadScene("models/plant_outdoors/scene.gltf");
const plantMeshes = getMeshesFromScene(plantScene);
const instancedPlantsArray = createInstancedMeshes(
  {
    countInRow: 10,
    countInColumn: 10,
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
// 1 - offset от края грядки по x
plantsGroup.position.x = gardenBedLG.position.x - gardenBedLGWidth / 2 + 1;
// 1.5 - offset от края грядки по z
plantsGroup.position.z = gardenBedLG.position.z - gardenBedLGLength / 2 + 1.5;

gardenBedLGGroup.add(plantsGroup);

gardenBedLGGroup.traverse((child) => {
  if (child.isMesh) {
    child.receiveShadow = true;
  }
});

export { gardenBedLGGroup, plantMeshes };
