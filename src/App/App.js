import * as THREE from "three";
import Sizes from "@app/core/Sizes";
import Loop from "@app/core/Loop";
import Camera from "@app/camera";
import Renderer from "@app/renderer";
import World from "@app/world";
import AssetLoader from "@app/core/assetLoader";
import { cameraOptions } from "@app/camera/cameraOptions";
import source from "@app/core/assetLoader/source";

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
    this.assetLoader.emitter.on("assetsLoaded", () => {
      this.world = new World(this);
    });
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
}

export default App;
