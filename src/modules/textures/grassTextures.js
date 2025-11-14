import { textureLoader } from "../loaders";

const color = textureLoader.load("textures/grass/Grass_002_COLOR.jpg");
const ambientOcclusion = textureLoader.load("textures/grass/Grass_002_OCC.jpg");
const height = textureLoader.load("textures/grass/Grass_002_DISP.png");
const normal = textureLoader.load("textures/grass/Grass_002_NORM.jpg");
const roughness = textureLoader.load("textures/grass/Grass_002_ROUGH.jpg");

export { color, ambientOcclusion, height, normal, roughness };
