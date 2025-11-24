import { textureLoader } from "../loaders";

const color = textureLoader.load("textures/ground/GroundDirtWeedsPatchy004_COL_2K.jpg");
const ambientOcclusion = textureLoader.load("textures/ground/GroundDirtWeedsPatchy004_AO_2K.jpg");
const height = textureLoader.load("textures/ground/GroundDirtWeedsPatchy004_DISP_2K.jpg");
const normal = textureLoader.load("textures/ground/GroundDirtWeedsPatchy004_NRM_2K.jpg");
const roughness = textureLoader.load("textures/ground/GroundDirtWeedsPatchy004_GLOSS_2K.jpg");

export { color, ambientOcclusion, height, normal, roughness };
