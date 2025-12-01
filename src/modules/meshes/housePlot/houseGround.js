import * as THREE from "three";
import * as grassTexture from "../../textures/grassTextures";
import * as houseRoadTexture from "../../textures/houseRoadTextures";
import { fenceWidth, gatesWidth } from "./fence";

// grass
const houseGround = new THREE.Group();
houseGround.rotation.x = -Math.PI / 2;

const grassGeometry = new THREE.PlaneGeometry(fenceWidth - 0.2, fenceWidth - 0.2, 50, 50);
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
houseGround.add(grass);

// road to the house
const houseRoadLength = 10.5;
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
houseGround.add(houseRoad);

houseGround.traverse((child) => {
  if (child.isMesh) {
    child.receiveShadow = true;
  }
});

export { houseGround, grassMaterial };
