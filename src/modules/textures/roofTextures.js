import { textureLoader } from "../loaders";

const color = textureLoader.load("textures/roof/Wood_Roof_Tiles_001_COLOR.jpg");
const ambientOcclusion = textureLoader.load("textures/roof/Wood_Roof_Tiles_001_OCC.jpg");
const height = textureLoader.load("textures/roof/Wood_Roof_Tiles_001_DISP.png");
const normal = textureLoader.load("textures/roof/Wood_Roof_Tiles_001_NORM.jpg");
const roughness = textureLoader.load("textures/roof/Wood_Roof_Tiles_001_ROUGH.jpg");

export { color, ambientOcclusion, height, normal, roughness };
