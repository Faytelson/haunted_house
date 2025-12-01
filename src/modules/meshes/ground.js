import * as THREE from "three";
import * as grassMainTexture from "../textures/grassMainTextures";

const grassMainMaterial = new THREE.MeshStandardMaterial({
  map: grassMainTexture.color,
  normalMap: grassMainTexture.normal,
  roughnessMap: grassMainTexture.roughness,
});
for (const key in grassMainTexture) {
  grassMainTexture[key].repeat.x = 20;
  grassMainTexture[key].repeat.y = 20;
  grassMainTexture[key].wrapS = THREE.RepeatWrapping;
  grassMainTexture[key].wrapT = THREE.RepeatWrapping;
}
grassMainTexture.color.colorSpace = THREE.SRGBColorSpace;

// base
const baseGround = new THREE.Mesh(new THREE.PlaneGeometry(300, 400), grassMainMaterial);
baseGround.position.z = -100;
baseGround.rotation.x = -Math.PI / 2;
baseGround.receiveShadow = true;

export { baseGround };
