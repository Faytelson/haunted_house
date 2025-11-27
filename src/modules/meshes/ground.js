import * as THREE from "three";

// base
const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x7b6f50 });
const baseGround = new THREE.Mesh(new THREE.PlaneGeometry(450, 250), baseMaterial);
baseGround.position.z = -80;
baseGround.rotation.x = -Math.PI / 2;
baseGround.receiveShadow = true;

export { baseGround };
