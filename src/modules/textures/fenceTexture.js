import * as THREE from "three";
import { textureLoader } from "../loaders";

const fenceTexture = {
  color: textureLoader.load("textures/fence/Wood_Fence_001_basecolor.jpg"),
  alpha: textureLoader.load("textures/fence/Wood_Fence_001_opacity.jpg"),
  ambientOcclusion: textureLoader.load("textures/fence/Wood_Fence_001_ambientOcclusion.jpg"),
  height: textureLoader.load("textures/fence/Wood_Fence_001_height.png"),
  normal: textureLoader.load("textures/fence/Wood_Fence_001_normal.jpg"),
  roughness: textureLoader.load("textures/fence/Wood_Fence_001_roughness.jpg"),
};

const wrapX = 5;
for (const key in fenceTexture) {
  fenceTexture[key].repeat.x = wrapX;
  fenceTexture[key].wrapS = THREE.RepeatWrapping;
  fenceTexture[key].wrapT = THREE.ClampToEdgeWrapping;
}
fenceTexture.color.colorSpace = THREE.SRGBColorSpace;

export { fenceTexture };
