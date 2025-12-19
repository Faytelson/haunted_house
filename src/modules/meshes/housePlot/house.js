import * as THREE from "three";
import { getOffsetByAngle } from "../../actions";
import { houseWallsTexture } from "../../textures/houseWallsTexture";
import { roofTexture } from "../../textures/roofTexture";
import { tooltipAnchorHouse } from "../tooltips";

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
