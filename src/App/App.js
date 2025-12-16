import * as THREE from "three";
import Sizes from "@app/core/Sizes";
import Loop from "@app/core/Loop";
import Camera from "@app/camera/Camera";
import { cameraOptions } from "@app/camera/cameraOptions";

class App {
  constructor(canvas) {
    this.canvas = canvas;
    this.sizes = new Sizes();
    this.resize = this.resize.bind(this);
    this.sizes.emitter.on("resize", this.resize);
    this.loop = new Loop();
    this.loop.emitter.on("loop", this.update.bind(this));
    this.scene = new THREE.Scene();
    this.cameraManager = new Camera(cameraOptions, this);
  }

  resize() {
    this.cameraManager.resize();
  }

  update() {
    this.cameraManager.update();
  }
}

export default App;
