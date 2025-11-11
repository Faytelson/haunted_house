import { textureLoader } from "../loaders";

const color = textureLoader.load("textures/walls/Wood_plank_COLOR.jpg");
const ambientOcclusion = textureLoader.load("textures/walls/Wood_plank_OCC.jpg");
const height = textureLoader.load("textures/walls/Wood_plank_DISP.png");
const normal = textureLoader.load("textures/walls/Wood_plank_NORM.jpg");
const roughness = textureLoader.load("textures/walls/Wood_plank_ROUGH.jpg");

export { color, ambientOcclusion, height, normal, roughness };
