import { textureLoader } from "../loaders";

const color = textureLoader.load(
  "textures/grass/Poliigon_GrassPatchyGround_4585_BaseColor.jpg",
);
const metalNess = textureLoader.load(
  "textures/grass/Poliigon_GrassPatchyGround_4585_Metallic.jpg",
);
const height = textureLoader.load(
  "textures/grass/Poliigon_GrassPatchyGround_4585_Displacement.png",
);
const normal = textureLoader.load(
  "textures/grass/Poliigon_GrassPatchyGround_4585_Normal.png",
);
const roughness = textureLoader.load(
  "textures/grass/Poliigon_GrassPatchyGround_4585_Roughness.jpg",
);

export { color, metalNess, height, normal, roughness };
