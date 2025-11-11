import * as THREE from "three";
import { getOffsetByAngle } from "../../utils";
import * as houseWallsTexture from "../textures/houseWallsTexture";

export const house = new THREE.Group();
const houseWidth = 6;
const houseHeight = 3.5;
const houseLength = 10;

// WALLS
const wrapX = 2.5;
const wallsMaterial = new THREE.MeshStandardMaterial({
  map: houseWallsTexture.color,
  aoMap: houseWallsTexture.ambientOcclusion,
  aoMapIntensity: 1.0,
  normalMap: houseWallsTexture.normal,
  roughnessMap: houseWallsTexture.roughness,
  displacementMap: houseWallsTexture.height,
  displacementScale: 0.002,
  side: THREE.DoubleSide,
});

for (const key in houseWallsTexture) {
  houseWallsTexture[key].repeat.x = wrapX;
  houseWallsTexture[key].wrapS = THREE.RepeatWrapping;
  houseWallsTexture[key].wrapT = THREE.ClampToEdgeWrapping;
  houseWallsTexture[key].offset.x = 0.32;
}

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(houseWidth, houseHeight, houseLength, 50, 50, 50),
  wallsMaterial,
);
walls.position.y = houseHeight / 2;
house.add(walls);

// WINDOWS
const windowOffsetY = 1;

// ROOF
const roofWidthHalf = houseWidth / 2;
const roofHeight = 2.5;
const roof = new THREE.Group();
roof.position.y = houseHeight;
house.add(roof);

// gable
const gableOffsetZ = houseLength / 2;

const gableShape = new THREE.Shape();
gableShape.moveTo(-roofWidthHalf, 0);
gableShape.lineTo(0, roofHeight);
gableShape.lineTo(roofWidthHalf, 0);
gableShape.lineTo(-roofWidthHalf, 0);

const gableGeometry = new THREE.ShapeGeometry(gableShape);
const gable = new THREE.Mesh(gableGeometry, wallsMaterial);

gable.position.z = -gableOffsetZ;
gable.castShadow = true;
gable.receiveShadow = true;

gableGeometry.computeBoundingBox();
const gableBBox = gableGeometry.boundingBox;
const gableSize = new THREE.Vector2(
  gableBBox.max.x - gableBBox.min.x,
  gableBBox.max.y - gableBBox.min.y,
);
const gableUV = gableGeometry.attributes.uv;
for (let i = 0; i < gableUV.count; i++) {
  gableUV.setXY(
    i,
    (gableUV.getX(i) - gableBBox.min.x) / gableSize.x,
    (gableUV.getY(i) - gableBBox.min.y) / gableSize.y,
  );
}
gableUV.needsUpdate = true;
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
const gableWindow = new THREE.Mesh(gableWindowGeometry, wallsMaterial);
gableWindow.position.z = gableOffsetZ;

gableWindowGeometry.computeBoundingBox();
const gableWindowBBox = gableWindowGeometry.boundingBox;
const gableWindowSize = new THREE.Vector2(
  gableWindowBBox.max.x - gableWindowBBox.min.x,
  gableWindowBBox.max.y - gableWindowBBox.min.y,
);
const gableWindowUV = gableWindowGeometry.attributes.uv;
for (let i = 0; i < gableWindowUV.count; i++) {
  gableWindowUV.setXY(
    i,
    (gableWindowUV.getX(i) - gableWindowBBox.min.x) / gableWindowSize.x,
    (gableWindowUV.getY(i) - gableWindowBBox.min.y) / gableWindowSize.y,
  );
}
gableWindowUV.needsUpdate = true;
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

roof.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true;
    child.receiveShadow = false;
  }
});

// DOOR
const doorWidth = 1.4;
const doorHeight = 2;

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(doorWidth, doorHeight),
  new THREE.MeshStandardMaterial({ color: 0x567eda }),
);
door.position.y = doorHeight / 2;
door.position.z = houseLength / 2 + 0.01;
house.add(door);

house.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true;
    child.receiveShadow = false;
  }
});
