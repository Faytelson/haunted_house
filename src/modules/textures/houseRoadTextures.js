import { textureLoader } from "../loaders";

const color = textureLoader.load("textures/house_road/StoneBricksSplitface001_COL_1K.jpg");
const ambientOcclusion = textureLoader.load(
  "textures/house_road/StoneBricksSplitface001_AO_1K.jpg",
);
const height = textureLoader.load("textures/house_road/StoneBricksSplitface001_DISP_1K.png");
const normal = textureLoader.load("/textures/house_road/StoneBricksSplitface001_NRM_1K.webp");

export { color, ambientOcclusion, height, normal };
