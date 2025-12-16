import { gltfLoader } from "./setup/loaders";

const loadScene = async (url) => {
  const gltf = await gltfLoader.loadAsync(url);
  return gltf.scene;
};
export { loadScene };
