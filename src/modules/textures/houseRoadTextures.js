import { textureLoader } from "../loaders";

const color = textureLoader.load(
  "textures/StoneBricksSplitface001/StoneBricksSplitface001_COL_1K.jpg",
);
const ambientOcclusion = textureLoader.load(
  "textures/StoneBricksSplitface001/StoneBricksSplitface001_AO_1K.jpg",
);
const height = textureLoader.load(
  "textures/StoneBricksSplitface001/StoneBricksSplitface001_DISP_1K.png",
);
const normal = textureLoader.load(
  "/textures/StoneBricksSplitface001/StoneBricksSplitface001_NRM_1K.png",
);

export { color, ambientOcclusion, height, normal };
