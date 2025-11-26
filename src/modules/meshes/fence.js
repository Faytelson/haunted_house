import * as THREE from "three";
import * as fenceTexture from "../textures/fenceTextures";

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
const wrapX = 20;
const fenceHalfGeometry = new THREE.BoxGeometry(
  fenceWidth / 2 - gatesWidth / 2,
  fenceHeight,
  fenceThickness,
  50, 50, 50,
);
for (const key in fenceTexture) {
  fenceTexture[key].repeat.x = wrapX;
  fenceTexture[key].wrapS = THREE.RepeatWrapping;
  fenceTexture[key].wrapT = THREE.ClampToEdgeWrapping;
}
fenceTexture.color.colorSpace = THREE.SRGBColorSpace;

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

fence.add(fenceFrontLeft, fenceFrontRight, fenceBack, fenceLeft, fenceRight);
