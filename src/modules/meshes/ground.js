import * as THREE from "three";

export const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshStandardMaterial({ color: 0xa9c388 }),
);

ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
