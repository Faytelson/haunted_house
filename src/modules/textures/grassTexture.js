import * as THREE from "three";
import { textureLoader } from "../loaders";

const grassTexture = {
  color: textureLoader.load("textures/grass/Poliigon_GrassPatchyGround_4585_BaseColor.jpg"),
  metalNess: textureLoader.load("textures/grass/Poliigon_GrassPatchyGround_4585_Metallic.jpg"),
  height: textureLoader.load("textures/grass/Poliigon_GrassPatchyGround_4585_Displacement.png"),
  normal: textureLoader.load("textures/grass/Poliigon_GrassPatchyGround_4585_Normal.png"),
  roughness: textureLoader.load("textures/grass/Poliigon_GrassPatchyGround_4585_Roughness.jpg"),
};

for (const key in grassTexture) {
  grassTexture[key].repeat.x = 10;
  grassTexture[key].repeat.y = 3;
  grassTexture[key].wrapS = THREE.RepeatWrapping;
  grassTexture[key].wrapT = THREE.RepeatWrapping;
}
grassTexture.color.colorSpace = THREE.SRGBColorSpace;

export { grassTexture };
