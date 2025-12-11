import * as THREE from "three";
import { fenceTexture } from "../../textures/fenceTexture";

export const fenceWidth = 35;
const fenceHeight = 2;
const fenceThickness = 0.05;
export const gatesWidth = 3;
export const fence = new THREE.Group();

const fenceMaterial = new THREE.MeshStandardMaterial({
  map: fenceTexture.color,
  alphaMap: fenceTexture.alpha,
  aoMap: fenceTexture.ambientOcclusion,
  aoMapIntensity: 1.0,
  normalMap: fenceTexture.normal,
  roughnessMap: fenceTexture.roughness,
  displacementMap: fenceTexture.height,
  displacementScale: 0.001,
  transparent: true,
  side: THREE.DoubleSide,
});

// left front
const fenceHalfGeometry = new THREE.BoxGeometry(
  fenceWidth / 2 - gatesWidth / 2,
  fenceHeight,
  fenceThickness,
  50,
  50,
  50,
);

const fenceFrontLeft = new THREE.Mesh(fenceHalfGeometry, fenceMaterial);
fenceFrontLeft.position.set(
  -(fenceWidth / 4 + gatesWidth / 4),
  fenceHeight / 2,
  fenceWidth / 2 - fenceThickness,
);

// right front
const fenceFrontRight = new THREE.Mesh(fenceHalfGeometry, fenceMaterial);
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

// gates
const gatesHeight = fenceHeight - 0.5;
const gatesGeometry = new THREE.BoxGeometry(gatesWidth / 2, gatesHeight, fenceThickness);
const gatesLeft = new THREE.Mesh(gatesGeometry, fenceMaterial);
const gatesLeftAngle = -Math.PI / 8;
gatesLeft.position.set(
  -gatesWidth / 2 + Math.cos(gatesLeftAngle) * (gatesWidth / 4),
  gatesHeight / 2,
  fenceWidth / 2 - fenceThickness - Math.sin(gatesLeftAngle) * (gatesWidth / 4),
);
gatesLeft.rotation.y = gatesLeftAngle;

const gatesRight = new THREE.Mesh(gatesGeometry, fenceMaterial);
const gatesRightAngle = Math.PI / 18;
gatesRight.position.set(
  gatesWidth / 2 - Math.cos(gatesRightAngle) * (gatesWidth / 4),
  gatesHeight / 2,
  fenceWidth / 2 - fenceThickness + Math.sin(gatesRightAngle) * (gatesWidth / 4),
);
gatesRight.rotation.y = gatesRightAngle;

fence.add(fenceFrontLeft, fenceFrontRight, fenceBack, fenceLeft, fenceRight, gatesLeft, gatesRight);
fence.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true;
    child.receiveShadow = false;
  }
});
