import * as THREE from "three";
import { textureLoader } from "../loaders";

const houseWallsTexture = {
  color: textureLoader.load("textures/walls/Wood_plank_COLOR.jpg"),
  ambientOcclusion: textureLoader.load("textures/walls/Wood_plank_OCC.jpg"),
  height: textureLoader.load("textures/walls/Wood_plank_DISP.png"),
  normal: textureLoader.load("textures/walls/Wood_plank_NORM.jpg"),
  roughness: textureLoader.load("textures/walls/Wood_plank_ROUGH.jpg"),
};

for (const key in houseWallsTexture) {
  houseWallsTexture[key].repeat.x = 2.5;
  houseWallsTexture[key].wrapS = THREE.RepeatWrapping;
  houseWallsTexture[key].wrapT = THREE.ClampToEdgeWrapping;
  houseWallsTexture[key].offset.x = 0.32;
}
houseWallsTexture.color.colorSpace = THREE.SRGBColorSpace;

export { houseWallsTexture };
