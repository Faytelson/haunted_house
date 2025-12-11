import * as THREE from "three";
import { textureLoader } from "../loaders";

const grassMainTexture = {
  color: textureLoader.load("textures/grass/Poliigon_GrassPatchyGround_4585_BaseColor.jpg"),
  normal: textureLoader.load("textures/grass/Poliigon_GrassPatchyGround_4585_Normal.png"),
  roughness: textureLoader.load("textures/grass/Poliigon_GrassPatchyGround_4585_Roughness.jpg"),
};

for (const key in grassMainTexture) {
  grassMainTexture[key].repeat.x = 40;
  grassMainTexture[key].repeat.y = 40;
  grassMainTexture[key].wrapS = THREE.RepeatWrapping;
  grassMainTexture[key].wrapT = THREE.RepeatWrapping;
}
grassMainTexture.color.colorSpace = THREE.SRGBColorSpace;

export { grassMainTexture };
