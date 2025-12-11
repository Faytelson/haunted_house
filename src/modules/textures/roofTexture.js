import * as THREE from "three";
import { textureLoader } from "../loaders";

const roofTexture = {
  color: textureLoader.load("textures/roof/Wood_Roof_Tiles_001_COLOR.jpg"),
  ambientOcclusion: textureLoader.load("textures/roof/Wood_Roof_Tiles_001_OCC.jpg"),
  height: textureLoader.load("textures/roof/Wood_Roof_Tiles_001_DISP.png"),
  normal: textureLoader.load("textures/roof/Wood_Roof_Tiles_001_NORM.jpg"),
  roughness: textureLoader.load("textures/roof/Wood_Roof_Tiles_001_ROUGH.jpg"),
};

for (const key in roofTexture) {
  roofTexture[key].repeat.x = 4;
  roofTexture[key].repeat.y = 2;
  roofTexture[key].wrapS = THREE.RepeatWrapping;
  roofTexture[key].wrapT = THREE.RepeatWrapping;
}
roofTexture.color.colorSpace = THREE.SRGBColorSpace;

export { roofTexture };
