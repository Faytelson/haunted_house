import * as THREE from "three";

export const houseGroup = new THREE.Group();

// walls
const houseWidth = 6;
const houseHeight = 3;
const houseLength = 10;

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(houseWidth, houseHeight, houseLength),
  new THREE.MeshStandardMaterial({ color: 0x8b4513 }),
);
walls.position.y = houseHeight / 2;
houseGroup.add(walls);

// roof
const roofHeight = 3;

const roof = new THREE.Mesh(
  new THREE.CylinderGeometry(1, 1, houseLength, 3, 1, false),
  new THREE.MeshStandardMaterial({ color: 0xb35f45 }),
);
roof.position.z = 1;
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

// fence
const fenceWidth = 50;
const fenceHeight = 2;
const fenceThickness = 0.05;
const gatesWidth = 4;

const fenceMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
// left front
const fenceFrontLeft = new THREE.Mesh(
  new THREE.BoxGeometry(fenceWidth / 2 - gatesWidth / 2, fenceHeight, fenceThickness),
  fenceMaterial,
);
fenceFrontLeft.position.set(
  -(fenceWidth / 4 + gatesWidth / 4),
  fenceHeight / 2,
  fenceWidth / 2 - fenceThickness,
);

// right front
const fenceFrontRight = new THREE.Mesh(
  new THREE.BoxGeometry(fenceWidth / 2 - gatesWidth / 2, fenceHeight, fenceThickness),
  fenceMaterial,
);
fenceFrontRight.position.set(
  fenceWidth / 4 + gatesWidth / 4,
  fenceHeight / 2,
  fenceWidth / 2 - fenceThickness,
);

// back
const fenceBack = new THREE.Mesh(
  new THREE.BoxGeometry(fenceWidth, fenceHeight, fenceThickness),
  fenceMaterial,
);
fenceBack.position.set(0, fenceHeight / 2, -(fenceWidth / 2 - fenceThickness));

// left
const fenceLeft = fenceBack.clone();
fenceLeft.position.set(-(fenceWidth / 2 + fenceThickness), fenceHeight / 2, 0);
fenceLeft.rotation.y = Math.PI / 2;

// right
const fenceRight = fenceBack.clone();
fenceRight.position.set(fenceWidth / 2 + fenceThickness, fenceHeight / 2, 0);
fenceRight.rotation.y = Math.PI / 2;

houseGroup.add(fenceFrontLeft, fenceFrontRight, fenceBack, fenceLeft, fenceRight);

houseGroup.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true;
    child.receiveShadow = false;
  }
});
