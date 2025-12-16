import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loadingManager = new THREE.LoadingManager();
loadingManager.onLoad = () => {
  console.log("loaded");
};
const textureLoader = new THREE.TextureLoader(loadingManager);
const gltfLoader = new GLTFLoader(loadingManager);
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager).setPath("cubeMaps/");

export { loadingManager, textureLoader, gltfLoader, cubeTextureLoader };
