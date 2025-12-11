import * as THREE from "three";
import { grassTexture } from "../../textures/grassTexture";
import { houseRoadTexture } from "../../textures/houseRoadTexture";
import { fenceWidth, gatesWidth } from "./fence";
import { gardenBedPlantsLength } from "./gardenBeds/gardenBedPlants";

// grass
const houseGround = new THREE.Group();
houseGround.rotation.x = -Math.PI / 2;
const grassGeometryBackLength = fenceWidth - gardenBedPlantsLength;

const grassGeometryBack = new THREE.PlaneGeometry(
  fenceWidth - 0.2,
  grassGeometryBackLength,
  50,
  17,
);
grassGeometryBack.setAttribute(
  "uv2",
  new THREE.BufferAttribute(grassGeometryBack.attributes.uv.array, 2),
);
for (let i = 0; i < grassGeometryBack.attributes.position.count; i++) {
  const z = Math.random() * 0.15;
  grassGeometryBack.attributes.position.setZ(i, z);
}
grassGeometryBack.computeVertexNormals();

const grassMaterial = new THREE.MeshStandardMaterial({
  map: grassTexture.color,
  normalMap: grassTexture.normal,
  roughnessMap: grassTexture.roughness,
  displacementMap: grassTexture.height,
  displacementScale: 0.1,
});

const grassBackYard = new THREE.Mesh(grassGeometryBack, grassMaterial);
grassBackYard.position.y = -grassGeometryBackLength / 2 + fenceWidth / 2 + 0.1;
grassBackYard.position.z = 0.001;
houseGround.add(grassBackYard);

// road to the house
const houseRoadLength = 10.2;
const houseRoadWidth = gatesWidth - 2;
const houseRoadGeometry = new THREE.PlaneGeometry(houseRoadWidth, houseRoadLength, 50, 150);
const houseRoadMaterial = new THREE.MeshStandardMaterial({
  map: houseRoadTexture.color,
  normalMap: houseRoadTexture.normal,
  aoMap: houseRoadTexture.ambientOcclusion,
  aoMapIntensity: 2,
  displacementMap: houseRoadTexture.height,
  displacementScale: 0.06,
});
const houseRoad = new THREE.Mesh(houseRoadGeometry, houseRoadMaterial);
houseRoad.position.y = -(fenceWidth / 2 - houseRoadLength / 2) + 0.1;
houseRoad.position.z = 0.001;
houseGround.add(houseRoad);

houseGround.traverse((child) => {
  if (child.isMesh) {
    child.receiveShadow = true;
  }
});

export { houseGround, grassMaterial };
