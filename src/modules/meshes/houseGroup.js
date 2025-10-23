import * as THREE from "three";

export const houseGroup = new THREE.Group();

// walls
const houseWidth = 4;
const houseHeight = 3;
const houseLength = 4;

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(houseWidth, houseHeight, houseLength),
  new THREE.MeshStandardMaterial({ color: 0x8b4513 }),
);
walls.position.y = houseHeight / 2;
houseGroup.add(walls);

// roof
const roofWidth = 3.5;
const roofHeight = 2;
const roofSegments = 4;

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(roofWidth, roofHeight, roofSegments),
  new THREE.MeshStandardMaterial({ color: 0xb35f45 }),
);
roof.position.y = houseHeight + roofHeight / 2;
roof.rotation.y = Math.PI / 4;
houseGroup.add(roof);

// door
const doorWidth = 1.4;
const doorHeight = 2;

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(doorWidth, doorHeight),
  new THREE.MeshStandardMaterial({ color: 0x567eda }),
);
door.position.y = doorHeight / 2;
door.position.z = houseLength / 2 + 0.01;
houseGroup.add(door);

houseGroup.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true; 
    child.receiveShadow = false;
  }
});
