import * as THREE from "three";
import { textureLoader } from "../setup/loaders";

const houseRoadTexture = {
  color: textureLoader.load("textures/house_road/StoneBricksSplitface001_COL_1K.jpg"),
  ambientOcclusion: textureLoader.load("textures/house_road/StoneBricksSplitface001_AO_1K.jpg"),
  height: textureLoader.load("textures/house_road/StoneBricksSplitface001_DISP_1K.png"),
  normal: textureLoader.load("textures/house_road/StoneBricksSplitface001_NRM_1K.webp"),
};

for (const key in houseRoadTexture) {
  houseRoadTexture[key].repeat.x = 1;
  houseRoadTexture[key].repeat.y = 20;
  houseRoadTexture[key].wrapS = THREE.RepeatWrapping;
  houseRoadTexture[key].wrapT = THREE.RepeatWrapping;
}
houseRoadTexture.color.colorSpace = THREE.SRGBColorSpace;

export { houseRoadTexture };
