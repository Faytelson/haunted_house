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
const grassGeometry = new THREE.PlaneGeometry(49.8, 49.8, 50, 50);
grassGeometry.setAttribute("uv2", new THREE.BufferAttribute(grassGeometry.attributes.uv.array, 2));
for (let i = 0; i < grassGeometry.attributes.position.count; i++) {
  const z = Math.random() * 0.15;
  grassGeometry.attributes.position.setZ(i, z);
}
grassGeometry.computeVertexNormals();
const grassMaterial = new THREE.MeshStandardMaterial({
  map: grassTexture.color,
  normalMap: grassTexture.normal,
  roughnessMap: grassTexture.roughness,
  displacementMap: grassTexture.height,
  displacementScale: 0.1,
});
for (const key in grassTexture) {
  grassTexture[key].repeat.x = 10;
  grassTexture[key].repeat.y = 10;
  grassTexture[key].wrapS = THREE.RepeatWrapping;
  grassTexture[key].wrapT = THREE.RepeatWrapping;
}
grassTexture.color.colorSpace = THREE.SRGBColorSpace;
const grass = new THREE.Mesh(grassGeometry, grassMaterial);
grass.position.z = 0.01;
ground.add(grass);

// garden bed
for (const key in groundTexture) {
  groundTexture[key].repeat.x = 3;
  groundTexture[key].repeat.y = 3;
  groundTexture[key].wrapS = THREE.RepeatWrapping;
  groundTexture[key].wrapT = THREE.RepeatWrapping;
}
groundTexture.color.colorSpace = THREE.SRGBColorSpace;
const gardenBedMaterial = new THREE.MeshStandardMaterial({
  map: groundTexture.color,
  normalMap: groundTexture.normal,
  displacementMap: groundTexture.height,
  displacementScale: 0.6,
});
const createGardenBed = (width, length, segmentsX, segmentsY, x, y, z = 0.005) => {
  const geometry = new THREE.PlaneGeometry(width, length, segmentsX, segmentsY);
  const bed = new THREE.Mesh(geometry, gardenBedMaterial);
  bed.position.x = x;
  bed.position.y = y;
  bed.position.z = z;
  return bed;
};
const gardenBedLG = createGardenBed(20, 28, 200, 200, 14, -9.2);
ground.add(gardenBedLG);

export const gardenBedMDWidth = 20.5;
export const gardenBedMDLength = 8;
const gardenBedMD1 = createGardenBed(
  gardenBedMDWidth,
  gardenBedMDLength,
  100,
  100,
  -(fenceWidth / 2 - gardenBedMDWidth / 2) + 1.6,
  -(fenceWidth / 2 - gardenBedMDLength / 2) + 1,
);

const gardenBedMD2 = createGardenBed(
  gardenBedMDWidth,
  gardenBedMDLength,
  100,
  100,
  -(fenceWidth / 2 - gardenBedMDWidth / 2) + 1.1,
  -(fenceWidth / 2 - gardenBedMDLength / 2) + 2 + gardenBedMDLength,
);

const gardenBedMD3 = createGardenBed(
  gardenBedMDWidth,
  gardenBedMDLength,
  100,
  100,
  -(fenceWidth / 2 - gardenBedMDWidth / 2) + 0.4,
  -(fenceWidth / 2 - gardenBedMDLength / 2) + 4.5 + gardenBedMDLength * 2,
);

ground.add(gardenBedMD1, gardenBedMD2, gardenBedMD3);

// road to the house
const houseRoadLength = 17.2;
const houseRoadWidth = gatesWidth - 2;
const houseRoadGeometry = new THREE.PlaneGeometry(houseRoadWidth, houseRoadLength, 50, 150);
const houseRoadMaterial = new THREE.MeshStandardMaterial({
  map: houseRoadTexture.color,
  normalMap: houseRoadTexture.normal,
  aoMap: houseRoadTexture.ambientOcclusion,
  aoMapIntensity: 2,
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
houseRoadTexture.color.colorSpace = THREE.SRGBColorSpace;
const houseRoad = new THREE.Mesh(houseRoadGeometry, houseRoadMaterial);
houseRoad.position.y = -(fenceWidth / 2 - houseRoadLength / 2) + 0.1;
houseRoad.position.z = 0.2;
ground.add(houseRoad);

ground.traverse((child) => {
  if (child.isMesh) {
    child.receiveShadow = true;
  }
});
