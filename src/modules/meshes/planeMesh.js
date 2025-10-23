import * as THREE from "three";

export const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(60, 60),
  new THREE.MeshStandardMaterial({ color: 0xa9c388 }),
);

plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
