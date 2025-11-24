import * as THREE from "three";
import * as grassTexture from "../textures/grassTextures";
import * as groundTexture from "../textures/groundTextures";
import * as houseRoadTexture from "../textures/houseRoadTextures";
import { fenceWidth, gatesWidth } from "./fence";

export const ground = new THREE.Group();
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;

// base
const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x7b6f50 });
const baseGround = new THREE.Mesh(new THREE.PlaneGeometry(200, 100), baseMaterial);
ground.add(baseGround);

// grass
const grassGeometry = new THREE.PlaneGeometry(50, 50, 10, 5);
// grassGeometry.setAttribute("uv2", new THREE.BufferAttribute(grassGeometry.attributes.uv.array, 2));
// for (let i = 0; i < grassGeometry.attributes.position.count; i++) {
//   const z = Math.random() * 0.5;
//   grassGeometry.attributes.position.setZ(i, z);
// }
// grassGeometry.computeVertexNormals();
const grassMaterial = new THREE.MeshStandardMaterial({
  map: grassTexture.color,
  normalMap: grassTexture.normal,
  roughnessMap: grassTexture.roughness,
  // displacementMap: grassTexture.height,
  // displacementScale: 0.3,
});
for (const key in grassTexture) {
  grassTexture[key].repeat.x = 10;
  grassTexture[key].repeat.y = 10;
  grassTexture[key].wrapS = THREE.RepeatWrapping;
  grassTexture[key].wrapT = THREE.RepeatWrapping;
}
const grass = new THREE.Mesh(grassGeometry, grassMaterial);
grass.position.z = 0.01;
ground.add(grass);

// garden bed
const gardenBedGeometry = new THREE.PlaneGeometry(20, 28, 200, 200);
const gardenBedMaterial = new THREE.MeshStandardMaterial({
  map: groundTexture.color,
  normalMap: groundTexture.normal,
  displacementMap: groundTexture.height,
  displacementScale: 0.6,
});
for (const key in groundTexture) {
  groundTexture[key].repeat.x = 3;
  groundTexture[key].repeat.y = 3;
  groundTexture[key].wrapS = THREE.RepeatWrapping;
  groundTexture[key].wrapT = THREE.RepeatWrapping;
}
gardenBedMaterial.color.set(0x754206);
const gardenBed = new THREE.Mesh(gardenBedGeometry, gardenBedMaterial);
gardenBed.position.x = 14;
gardenBed.position.y = -9.2;
gardenBed.position.z = 0.00005;
ground.add(gardenBed);

export const gardenBedSmWidth = 18;
export const gardenBedSmLength = 9;
const gardenBedSmGeometry = new THREE.PlaneGeometry(gardenBedSmWidth, gardenBedSmLength, 100, 100);
const createGardenBedSm = (x, y) => {
  const bed = new THREE.Mesh(gardenBedSmGeometry, gardenBedMaterial);
  bed.position.x = x;
  bed.position.y = y;
  return bed;
};
const gardenBedSm1 = createGardenBedSm(
  -(fenceWidth / 2 - gardenBedSmWidth / 2) + 1.6,
  -(fenceWidth / 2 - gardenBedSmLength / 2) + 1,
);

const gardenBedSm2 = createGardenBedSm(
  -(fenceWidth / 2 - gardenBedSmWidth / 2) + 1.1,
  -(fenceWidth / 2 - gardenBedSmLength / 2) + 2 + gardenBedSmLength,
);

const gardenBedSm3 = createGardenBedSm(
  -(fenceWidth / 2 - gardenBedSmWidth / 2) + 1.3,
  -(fenceWidth / 2 - gardenBedSmLength / 2) + 5 + gardenBedSmLength * 2,
);
ground.add(gardenBedSm1, gardenBedSm2, gardenBedSm3);

// road to the house
const houseRoadLength = 17.2;
const houseRoadWidth = gatesWidth - 2;
const houseRoadGeometry = new THREE.PlaneGeometry(houseRoadWidth, houseRoadLength, 50, 150);
const houseRoadMaterial = new THREE.MeshStandardMaterial({
  map: houseRoadTexture.color,
  normalMap: houseRoadTexture.normal,
  aoMap: houseRoadTexture.ambientOcclusion,
  aoMapIntensity: 0.5,
  displacementMap: houseRoadTexture.height,
  displacementScale: 0.06,
  roughnessMap: houseRoadTexture.roughness,
});
for (const key in houseRoadTexture) {
  houseRoadTexture[key].repeat.x = 1;
  houseRoadTexture[key].repeat.y = 20;
  houseRoadTexture[key].wrapS = THREE.RepeatWrapping;
  houseRoadTexture[key].wrapT = THREE.RepeatWrapping;
}
const houseRoad = new THREE.Mesh(houseRoadGeometry, houseRoadMaterial);
houseRoad.position.y = -(fenceWidth / 2 - houseRoadLength / 2) + 0.1;
houseRoad.position.z = 0.05;
ground.add(houseRoad);

ground.traverse((child) => {
  if (child.isMesh) {
    child.receiveShadow = true;
  }
});
