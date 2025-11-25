import * as THREE from "three";
import { getOffsetByAngle } from "../../utils";
import * as houseWallsTexture from "../textures/houseWallsTextures";
import * as roofTexture from "../textures/roofTextures";
import * as doorTexture from "../textures/doorTextures";

export const house = new THREE.Group();
const houseWidth = 6;
const houseHeight = 3.5;
const houseLength = 10;

// WALLS
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
  houseWallsTexture[key].repeat.x = 2.5;
  houseWallsTexture[key].wrapS = THREE.RepeatWrapping;
  houseWallsTexture[key].wrapT = THREE.ClampToEdgeWrapping;
  houseWallsTexture[key].offset.x = 0.32;
}
houseWallsTexture.color.colorSpace = THREE.SRGBColorSpace;

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(houseWidth, houseHeight, houseLength, 50, 50, 50),
  wallsMaterial,
);
walls.position.y = houseHeight / 2;
house.add(walls);

// SECOND FLOOR
const houseWidthHalf = houseWidth / 2;
const secondFloorHeight = 2.5;
const secondFloor = new THREE.Group();
secondFloor.position.y = houseHeight;
house.add(secondFloor);

// gable
const gableOffsetZ = houseLength / 2;

const gableShape = new THREE.Shape();
gableShape.moveTo(-houseWidthHalf, 0);
gableShape.lineTo(0, secondFloorHeight);
gableShape.lineTo(houseWidthHalf, 0);
gableShape.lineTo(-houseWidthHalf, 0);

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
secondFloor.add(gable);

// gableWindow
const gableWindowShape = new THREE.Shape();
gableWindowShape.moveTo(-houseWidthHalf, 0);
gableWindowShape.lineTo(0, secondFloorHeight);
gableWindowShape.lineTo(houseWidthHalf, 0);
gableWindowShape.lineTo(-houseWidthHalf, 0);

const gableWindowRadius = 0.4;
const holePath = new THREE.Path();
holePath.absarc(0, 1 + gableWindowRadius, gableWindowRadius, 0, Math.PI * 2);
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
secondFloor.add(gableWindow);

// ROOF
// left slope
const slopeHeight = Math.sqrt(houseWidthHalf ** 2 + secondFloorHeight ** 2);
const slopeAngle = Math.acos(houseWidthHalf / slopeHeight);
const slopeOffset = 0.6;
const slopeHeightWithOffset = slopeHeight + slopeOffset;

const leftSlope = new THREE.Mesh(
  new THREE.BoxGeometry(houseLength + 0.8, slopeHeightWithOffset, 0.05, 200, 200),
  new THREE.MeshStandardMaterial({
    map: roofTexture.color,
    aoMap: roofTexture.ambientOcclusion,
    aoMapIntensity: 2.0,
    normalMap: roofTexture.normal,
    roughnessMap: roofTexture.roughness,
    displacementMap: roofTexture.height,
    displacementScale: 0.06,
    side: THREE.DoubleSide,
  }),
);
roofTexture.color.colorSpace = THREE.SRGBColorSpace;

leftSlope.geometry.rotateY(Math.PI / 2);
leftSlope.rotation.z = -(Math.PI / 2 - slopeAngle);
const [slopeOffsetX, slopeOffsetY] = getOffsetByAngle(slopeHeight / 2, slopeAngle);
const [slopeOffsetX2, slopeOffsetY2] = getOffsetByAngle(slopeOffset / 2, slopeAngle);
leftSlope.position.x = -slopeOffsetX - slopeOffsetX2;
leftSlope.position.y = slopeOffsetY - slopeOffsetY2;

// right slope
const rightSlope = leftSlope.clone();
rightSlope.rotation.z = Math.PI / 2 - slopeAngle;
rightSlope.position.x = slopeOffsetX + slopeOffsetX2;
secondFloor.add(leftSlope, rightSlope);

secondFloor.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true;
    child.receiveShadow = false;
  }
});

for (const key in roofTexture) {
  roofTexture[key].repeat.x = 4;
  roofTexture[key].repeat.y = 2;
  roofTexture[key].wrapS = THREE.RepeatWrapping;
  roofTexture[key].wrapT = THREE.RepeatWrapping;
}

// DOOR
const doorWidth = 1.4 * 1.5;
const doorHeight = 2;

const doorMaterial = new THREE.MeshStandardMaterial({
  map: doorTexture.color,
  aoMap: doorTexture.ambientOcclusion,
  aoMapIntensity: 1.0,
  normalMap: doorTexture.normal,
  roughnessMap: doorTexture.roughness,
  displacementMap: doorTexture.height,
  displacementScale: 0.06,
  alphaMap: doorTexture.alpha,
  transparent: true,
  metalnessMap: doorTexture.metalness,
  metalness: 0.7,
  side: THREE.DoubleSide,
});
doorMaterial.color.set(0x999999);
const door = new THREE.Mesh(new THREE.PlaneGeometry(doorWidth, doorHeight, 50, 50), doorMaterial);
door.position.y = doorHeight / 2 + 0.1;
door.position.z = houseLength / 2 + 0.01;
house.add(door);

house.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true;
    child.receiveShadow = false;
  }
});
