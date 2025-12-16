import * as THREE from "three";
import { textureLoader } from "../setup/loaders";

const doorTexture = {
  color: textureLoader.load("textures/door/Door_Wood_001_basecolor.jpg"),
  ambientOcclusion: textureLoader.load("textures/door/Door_Wood_001_ambientOcclusion.jpg"),
  height: textureLoader.load("textures/door/Door_Wood_001_height.png"),
  normal: textureLoader.load("textures/door/Door_Wood_001_normal.jpg"),
  roughness: textureLoader.load("textures/door/Door_Wood_001_roughness.jpg"),
  alpha: textureLoader.load("textures/door/Door_Wood_001_opacity.jpg"),
  metalness: textureLoader.load("textures/door/Door_Wood_001_metallic.jpg"),
};
doorTexture.color.colorSpace = THREE.SRGBColorSpace;

export { doorTexture };
