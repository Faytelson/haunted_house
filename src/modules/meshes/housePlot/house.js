import * as THREE from "three";
import { getOffsetByAngle } from "../../actions";
import { houseWallsTexture } from "../../textures/houseWallsTexture";
import { roofTexture } from "../../textures/roofTexture";
import { doorTexture } from "../../textures/doorTexture";
import { tooltipAnchorHouse } from "../tooltips";

const house = new THREE.Group();
const houseWidth = 7;
const houseLength = 10;

// WALLS
const firstFloorHeight = 3.5;
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

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(houseWidth, firstFloorHeight, houseLength, 50, 50, 50),
  wallsMaterial,
);
walls.position.y = firstFloorHeight / 2;
house.add(walls);

// SECOND FLOOR
const houseWidthHalf = houseWidth / 2;
const secondFloorHeight = 3;
const secondFloor = new THREE.Group();
secondFloor.position.y = firstFloorHeight;
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
const roofMaterial = new THREE.MeshStandardMaterial({
  map: roofTexture.color,
  aoMap: roofTexture.ambientOcclusion,
  aoMapIntensity: 2.0,
  normalMap: roofTexture.normal,
  roughnessMap: roofTexture.roughness,
  displacementMap: roofTexture.height,
  displacementScale: 0.06,
  side: THREE.DoubleSide,
});

const leftSlope = new THREE.Mesh(
  new THREE.BoxGeometry(houseLength + 0.8, slopeHeightWithOffset, 0.05, 200, 200),
  roofMaterial,
);

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

// DOOR
// Изначальная ширина двери 1.4, умноженная на коэффициент
// чтобы текстура легла на нужную ширину
const doorWidth = 1.4 * 1.5;
const doorHeight = 2;

const doorMaterial = new THREE.MeshStandardMaterial({
  map: doorTexture.color,
  aoMap: doorTexture.ambientOcclusion,
  aoMapIntensity: 1.0,
  normalMap: doorTexture.normal,
  roughnessMap: doorTexture.roughness,
  displacementMap: doorTexture.height,
  displacementScale: 0.1,
  alphaMap: doorTexture.alpha,
  transparent: true,
  metalnessMap: doorTexture.metalness,
  metalness: 0.7,
  side: THREE.DoubleSide,
});
doorMaterial.color.set(0x999999);
const door = new THREE.Mesh(new THREE.PlaneGeometry(doorWidth, doorHeight, 50, 50), doorMaterial);
door.position.y = doorHeight / 2 + 0.3;
door.position.z = houseLength / 2 + 0.01;
house.add(door);

// PORCH
const porchLength = 2;
const stepHeight = 0.17;
const stepDiff = 0.25;
const porchHeightWithoutAngle = stepHeight * 2 + doorHeight + 0.5;

const porch = new THREE.Group();
porch.position.y = stepHeight / 2;
porch.position.z = houseLength / 2 + porchLength / 2;
house.add(porch);

// threshold
const threshold = new THREE.Group();
porch.add(threshold);
// длина порога - это длина двери + 0.5 м по бокам
const thresholdWidth = doorWidth + 2 * 0.5;
const thresholdMaterial = new THREE.MeshStandardMaterial({
  map: houseWallsTexture.color,
  aoMap: houseWallsTexture.ambientOcclusion,
  aoMapIntensity: 1.0,
  normalMap: houseWallsTexture.normal,
  roughnessMap: houseWallsTexture.roughness,
  displacementMap: houseWallsTexture.height,
  displacementScale: 0.002,
  side: THREE.DoubleSide,
});

const step1Geometry = new THREE.BoxGeometry(thresholdWidth, stepHeight, porchLength);
const step1 = new THREE.Mesh(step1Geometry, thresholdMaterial);
step1.position.y = 0;
threshold.add(step1);
const step2Geometry = new THREE.BoxGeometry(thresholdWidth, stepHeight, porchLength - stepDiff);
const step2 = new THREE.Mesh(step2Geometry, thresholdMaterial);
step2.position.y = stepHeight + 0.005;
step2.position.z = -stepDiff / 2;
threshold.add(step2);

// porch roof
const roofHeight = 0.05;
const porchRoofGeometry = new THREE.BoxGeometry(thresholdWidth, roofHeight, 2.4);
const porchRoof = new THREE.Mesh(porchRoofGeometry, roofMaterial);
porchRoof.position.y = porchHeightWithoutAngle;
porchRoof.rotation.x = Math.PI / 15;
porch.add(porchRoof);

// pillars
const pillarHeight = porchHeightWithoutAngle - stepHeight;
const pillarRadius = 0.1;
const pillarGeometry = new THREE.CylinderGeometry(
  pillarRadius,
  pillarRadius,
  pillarHeight - roofHeight,
  32,
  32,
  true,
);
const pillarLeft = new THREE.Mesh(pillarGeometry, wallsMaterial);
pillarLeft.position.x = thresholdWidth / 2 - pillarRadius;
pillarLeft.position.y = pillarHeight / 2;
pillarLeft.position.z = porchLength / 2 - pillarRadius;
pillarLeft.rotation.x = Math.PI;
porch.add(pillarLeft);

const pillarRight = pillarLeft.clone();
pillarRight.position.x = -(thresholdWidth / 2 - pillarRadius);
porch.add(pillarRight);

// tooltip
house.add(tooltipAnchorHouse);
tooltipAnchorHouse.position.set(0, firstFloorHeight + secondFloorHeight + 1, houseLength / 2);

house.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true;
    child.receiveShadow = false;
  }
});

house.userData.groupID = "house";

export { house, wallsMaterial, doorWidth, doorHeight, doorMaterial, roofMaterial };
