import * as THREE from "three";
import * as grassTexture from "../textures/grassTextures";

export const ground = new THREE.Group();
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;

const baseGround = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 100),
  new THREE.MeshStandardMaterial({ color: 0x7b6f50 }),
);
ground.add(baseGround);

const grassGeometry = new THREE.PlaneGeometry(50, 20, 200, 100);
grassGeometry.setAttribute("uv2", new THREE.BufferAttribute(grassGeometry.attributes.uv.array, 2));

const grassMaterial = new THREE.MeshStandardMaterial({
  map: grassTexture.color,
  normalMap: grassTexture.normal,
  roughnessMap: grassTexture.roughness,
  aoMap: grassTexture.ambientOcclusion,
  aoMapIntensity: 1,
});
grassMaterial.color.set(0xcdf9b5);

const grass = new THREE.Mesh(
  grassGeometry,
  grassMaterial,
);

for (const key in grassTexture) {
  grassTexture[key].repeat.x = 15;
  grassTexture[key].repeat.y = 10;
  grassTexture[key].wrapS = THREE.RepeatWrapping;
  grassTexture[key].wrapT = THREE.RepeatWrapping;
}

for (let i = 0; i < grassGeometry.attributes.position.count; i++) {
  const z = Math.random() * .3;
  grassGeometry.attributes.position.setZ(i, z);
}
grassGeometry.computeVertexNormals();
grass.position.y = 15;
grass.position.z = 0.005;

ground.add(grass);
