import * as THREE from "three";
import { textureLoader } from "../loaders";

const woodTexture = {
  color: textureLoader.load("textures/wood/Wood_025_basecolor.jpg"),
  ambientOcclusion: textureLoader.load("textures/wood/Wood_025_ambientOcclusion.jpg"),
  height: textureLoader.load("textures/wood/Wood_025_height.png"),
  normal: textureLoader.load("textures/wood/Wood_025_normal.jpg"),
  roughness: textureLoader.load("textures/wood/Wood_025_roughness.jpg"),
};
woodTexture.color.colorSpace = THREE.SRGBColorSpace;

export { woodTexture };
