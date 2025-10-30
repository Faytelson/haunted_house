import * as THREE from "three";
import { getOffsetByAngle } from "../../utils";

export const houseGroup = new THREE.Group();
const houseWidth = 6;
const houseHeight = 3.5;
const houseLength = 10;

// WALLS
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(houseWidth, houseHeight, houseLength),
  new THREE.MeshStandardMaterial({ color: 0x8b4513 }),
);
walls.position.y = houseHeight / 2;
houseGroup.add(walls);

// WINDOWS
const windowOffsetY = 1;

// ROOF
const roofWidthHalf = houseWidth / 2;
const roofHeight = 2.5;
const roof = new THREE.Group();
roof.position.y = houseHeight;
houseGroup.add(roof);

// gable
const gableOffsetZ = houseLength / 2;
const positionsArray = new Float32Array([
  -roofWidthHalf,
  0,
  0,
  0,
  roofHeight,
  0,
  roofWidthHalf,
  0,
  0,
]);
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
const gableGeometry = new THREE.BufferGeometry();
gableGeometry.setAttribute("position", positionsAttribute);

const gable = new THREE.Mesh(
  gableGeometry,
  new THREE.MeshStandardMaterial({ color: 0x8b4513, side: THREE.DoubleSide }),
);
gable.position.z = -gableOffsetZ;
roof.add(gable);

// gableWindow
const gableWindowShape = new THREE.Shape();
gableWindowShape.moveTo(-roofWidthHalf, 0);
gableWindowShape.lineTo(0, roofHeight);
gableWindowShape.lineTo(roofWidthHalf, 0);
gableWindowShape.lineTo(-roofWidthHalf, 0);

const gableWindowRadius = 0.4;
const holePath = new THREE.Path();
holePath.absarc(0, windowOffsetY + gableWindowRadius, gableWindowRadius, 0, Math.PI * 2);
gableWindowShape.holes.push(holePath);
const gableWindowGeometry = new THREE.ShapeGeometry(gableWindowShape);
const gableWindow = new THREE.Mesh(
  gableWindowGeometry,
  new THREE.MeshStandardMaterial({ color: 0x8b4513, side: THREE.DoubleSide }),
);
gableWindow.position.z = gableOffsetZ;
roof.add(gableWindow);

// slopes
const slopeHeight = Math.sqrt(roofWidthHalf ** 2 + roofHeight ** 2);
const slopeAngle = Math.acos(roofWidthHalf / slopeHeight);
const slopeOffset = 0.6;
const slopeHeightWithOffset = slopeHeight + slopeOffset;

const leftSlope = new THREE.Mesh(
  new THREE.PlaneGeometry(houseLength + 0.8, slopeHeightWithOffset, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x567e3a, side: THREE.DoubleSide }),
);
leftSlope.geometry.rotateY(Math.PI / 2);
leftSlope.rotation.z = -(Math.PI / 2 - slopeAngle);
const [slopeOffsetX, slopeOffsetY] = getOffsetByAngle(slopeHeight / 2, slopeAngle);
const [slopeOffsetX2, slopeOffsetY2] = getOffsetByAngle(slopeOffset / 2, slopeAngle);
leftSlope.position.x = -slopeOffsetX - slopeOffsetX2;
leftSlope.position.y = slopeOffsetY - slopeOffsetY2;

const rightSlope = leftSlope.clone();
rightSlope.rotation.z = Math.PI / 2 - slopeAngle;
rightSlope.position.x = slopeOffsetX + slopeOffsetX2;
roof.add(leftSlope, rightSlope);

// DOOR
const doorWidth = 1.4;
const doorHeight = 2;

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(doorWidth, doorHeight),
  new THREE.MeshStandardMaterial({ color: 0x567eda }),
);
door.position.y = doorHeight / 2;
door.position.z = houseLength / 2 + 0.01;
houseGroup.add(door);

// FENCE
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
