import { textureLoader } from "../loaders";

const color = textureLoader.load("textures/door/Door_Wood_001_basecolor.jpg");
const ambientOcclusion = textureLoader.load(
  "textures/door/Door_Wood_001_ambientOcclusion.jpg",
);
const height = textureLoader.load("textures/door/Door_Wood_001_height.png");
const normal = textureLoader.load("textures/door/Door_Wood_001_normal.jpg");
const roughness = textureLoader.load("textures/door/Door_Wood_001_roughness.jpg");
const alpha = textureLoader.load("textures/door/Door_Wood_001_opacity.jpg");
const metalness = textureLoader.load("textures/door/Door_Wood_001_metallic.jpg");

export { color, ambientOcclusion, height, normal, roughness, alpha, metalness };
