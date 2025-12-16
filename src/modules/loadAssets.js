import { cubeTextureLoader } from "./setup/loaders";

const sky = await cubeTextureLoader.loadAsync([
  "px.png",
  "nx.png",
  "py.png",
  "ny.png",
  "pz.png",
  "nz.png",
]);
scene.background = sky;
