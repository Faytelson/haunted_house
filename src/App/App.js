import * as THREE from "three";
// core
import Sizes from "@core/Sizes";
import Loop from "@core/Loop";
import Camera from "@core/camera";
import { cameraOptions } from "@core/camera/cameraOptions";
import Renderer from "@core/renderer";
import AssetLoader from "@core/assetLoader";
// textures and env
import source from "@app/textures/";
import Environment from "@app/environment";
import config from "@app/environment/config";
// world
import World from "@app/world";

class App {
  constructor(canvas) {
    this.canvas = canvas;
    this.sizes = new Sizes();

    this.resize = this.resize.bind(this);
    this.sizes.emitter.on("resize", this.resize);

    this.loop = new Loop();
    this.update = this.update.bind(this);
    this.loop.emitter.on("loop", this.update);

    this.scene = new THREE.Scene();
    this.assetLoader = new AssetLoader(source);
    this.onAssetsLoaded = this.onAssetsLoaded.bind(this);
    this.assetLoader.emitter.on("assetsLoaded", this.onAssetsLoaded);
    this.cameraManager = new Camera(cameraOptions, this);
    this.renderer = new Renderer(this);
  }

  resize() {
    this.cameraManager.resize();
    this.renderer.resize();
  }

  update() {
    this.cameraManager.update();
    this.renderer.update();
  }

  onAssetsLoaded() {
    this.environment = new Environment(this, config);
    this.world = new World(this);
    // this.world.emitter.on("worldReady", {
    // this.environment.updateMaterials()
    // })
  }
}

export default App;
