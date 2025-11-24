import { textureLoader } from "../loaders";

const color = textureLoader.load("textures/house_road/Stylized_Stone_Floor_005_basecolor.jpg");
const ambientOcclusion = textureLoader.load(
  "textures/house_road/Stylized_Stone_Floor_005_ambientOcclusion.jpg",
);
const height = textureLoader.load("textures/house_road/Stylized_Stone_Floor_005_height.png");
const normal = textureLoader.load("textures/house_road/Stylized_Stone_Floor_005_normal.jpg");
const roughness = textureLoader.load("textures/house_road/Stylized_Stone_Floor_005_roughness.jpg");

export { color, ambientOcclusion, height, normal, roughness };
