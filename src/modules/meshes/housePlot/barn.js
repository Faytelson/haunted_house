import * as THREE from "three";
import { wallsMaterial } from "./house";
import { fenceWidth } from "./fence";
import { doorWidth, doorHeight, doorMaterial, roofMaterial } from "./house";

const barn = new THREE.Group();
const barnWidth = 4;
const barnHeight = 3.5;
const barnLength = 5;

const barnWalls = new THREE.Mesh(
  new THREE.BoxGeometry(barnWidth, barnHeight, barnLength, 50, 50, 50),
  wallsMaterial,
);
barnWalls.position.y = barnHeight / 2;
barn.add(barnWalls);

const barnDoor = new THREE.Mesh(
  new THREE.PlaneGeometry(doorWidth, doorHeight, 50, 50),
  doorMaterial,
);
barnDoor.position.y = doorHeight / 2 + 0.1;
barnDoor.position.z = barnLength / 2 + 0.01;
barn.add(barnDoor);

const barnRoof = new THREE.Mesh(
  new THREE.BoxGeometry(barnWidth + 0.8, 0.15, barnLength + 0.6, 50, 50, 50),
  roofMaterial,
);
barnRoof.position.y = barnHeight;
barn.add(barnRoof);

barn.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true;
    child.receiveShadow = false;
  }
});

barn.position.x = fenceWidth / 2 - barnWidth / 2 - 2;
barn.position.z = -(fenceWidth / 2 - barnWidth / 2) + 2;

export { barn };
