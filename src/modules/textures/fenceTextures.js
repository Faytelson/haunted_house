import { textureLoader } from "../loaders";

const color = textureLoader.load("textures/fence/Wood_Fence_001_basecolor.jpg");
const alpha = textureLoader.load("textures/fence/Wood_Fence_001_opacity.jpg");
const ambientOcclusion = textureLoader.load(
  "textures/fence/Wood_Fence_001_ambientOcclusion.jpg",
);
const height = textureLoader.load("textures/fence/Wood_Fence_001_height.png");
const normal = textureLoader.load("textures/fence/Wood_Fence_001_normal.jpg");
const roughness = textureLoader.load("textures/fence/Wood_Fence_001_roughness.jpg");

export { color, alpha, ambientOcclusion, height, normal, roughness };
