import * as THREE from "three";
import { textureLoader } from "../setup/loaders";

const groundTexture = {
  color: textureLoader.load("textures/ground/GroundDirtWeedsPatchy004_COL_2K.jpg"),
  ambientOcclusion: textureLoader.load("textures/ground/GroundDirtWeedsPatchy004_AO_2K.jpg"),
  height: textureLoader.load("textures/ground/GroundDirtWeedsPatchy004_DISP_2K.jpg"),
  normal: textureLoader.load("textures/ground/GroundDirtWeedsPatchy004_NRM_2K.jpg"),
  roughness: textureLoader.load("textures/ground/GroundDirtWeedsPatchy004_GLOSS_2K.jpg"),
};

for (const key in groundTexture) {
  groundTexture[key].repeat.x = 3;
  groundTexture[key].repeat.y = 3;
  groundTexture[key].wrapS = THREE.RepeatWrapping;
  groundTexture[key].wrapT = THREE.RepeatWrapping;
}
groundTexture.color.colorSpace = THREE.SRGBColorSpace;

export { groundTexture };
