import * as THREE from "three";
import { groundTexture } from "../../../textures/groundTexture";

const gardenBedMaterial = new THREE.MeshStandardMaterial({
  map: groundTexture.color,
  normalMap: groundTexture.normal,
  displacementMap: groundTexture.height,
  displacementScale: 0.3,
});

const createGardenBed = ({ width, length, segmentsX, segmentsY, x = 0, y = 0, z = 0 }) => {
  const geometry = new THREE.PlaneGeometry(width, length, segmentsX, segmentsY);
  const bed = new THREE.Mesh(geometry, gardenBedMaterial);
  bed.rotation.x = -Math.PI / 2;
  bed.position.x = x;
  bed.position.y = y;
  bed.position.z = z;
  return bed;
};

const gardenBedLGWidth = 13;
const gardenBedLGLength = 22;

const gardenBedMDWidth = 13;
const gardenBedMDLength = 6;

export {
  gardenBedMaterial,
  createGardenBed,
  gardenBedLGWidth,
  gardenBedLGLength,
  gardenBedMDWidth,
  gardenBedMDLength,
};
