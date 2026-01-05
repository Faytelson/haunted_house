import * as THREE from "three";

class Renderer {
  constructor(app) {
    this.sizes = app.sizes;
    this.canvas = app.canvas;
    this.camera = app.cameraManager.instance;
    this.scene = app.scene;
    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = THREE.sRGBEncoding;
    this.instance.toneMapping = THREE.ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 1.2;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  compile() {
    return this.instance.compileAsync(this.scene, this.camera);
  }

  render() {
    this.instance.render(this.scene, this.camera);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.instance.render(this.scene, this.camera);
  }
}

export default Renderer;
