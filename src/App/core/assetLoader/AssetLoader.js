import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import EventEmitter from "@app/core/EventEmitter";

class AssetLoader {
  constructor(source) {
    this.source = source;
    this.assets = {};
    this.emitter = new EventEmitter();

    this.setLoadingManager();
    this.setLoaders();
    this.startLoading();
  }

  setLoadingManager() {
    this.loadingManager = new THREE.LoadingManager();

    this.loadingManager.onLoad = () => {
      this.emitter.emit("assetsLoaded");
    };

    this.loadingManager.onError = (url) => {
      throw new Error(`Texture has not been loaded: ${url}`);
    };
  }

  setLoaders() {
    this.loaders = {
      gltfLoader: new GLTFLoader(this.loadingManager),
      textureLoader: new THREE.TextureLoader(this.loadingManager),
      cubeTextureLoader: new THREE.CubeTextureLoader(this.loadingManager),
    };
  }

  startLoading() {
    this.source.forEach((asset) => this.loadAsset(asset));
  }

  loadAsset(asset) {
    const { type, category, name, path } = asset;

    const store = (file) => {
      if (!this.assets[category]) {
        this.assets[category] = {};
      }
      this.assets[category][name] = file;
    };

    switch (type) {
      case "gltfModel": {
        this.loaders.gltfLoader.load(path, store);
        break;
      }
      case "cubeTexture": {
        this.loaders.cubeTextureLoader.load(path, store);
        break;
      }
      case "texture": {
        this.loaders.textureLoader.load(path, store);
        break;
      }
      default: {
        throw new Error(`Unknown asset type: ${type}`);
      }
    }
  }
}

export default AssetLoader;
