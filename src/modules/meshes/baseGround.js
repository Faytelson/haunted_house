import * as THREE from "three";
import { grassMainTexture } from "../textures/grassMainTexture";

const grassMainMaterial = new THREE.MeshStandardMaterial({
  map: grassMainTexture.color,
  normalMap: grassMainTexture.normal,
  roughnessMap: grassMainTexture.roughness,
});

// base
const baseGround = new THREE.Mesh(new THREE.PlaneGeometry(150, 200), grassMainMaterial);
baseGround.position.z = -50;
baseGround.rotation.x = -Math.PI / 2;
baseGround.receiveShadow = true;

export { baseGround };
