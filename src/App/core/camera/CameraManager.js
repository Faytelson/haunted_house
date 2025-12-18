import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

class Camera {
  constructor(options, app) {
    this.fov = options.fov || 60;
    this.near = options.near || 0.1;
    this.far = options.far || 1000;
    this.start = options.start || { x: 0, y: 0, z: 0 };
    this.target = options.target || { x: 0, y: 0, z: 0 };
    this.sizes = app.sizes;
    this.canvas = app.canvas;
    this.scene = app.scene;

    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      this.fov,
      this.sizes.width / this.sizes.height || 1 / 1,
      this.near,
      this.far,
    );
    this.instance.position.copy(new THREE.Vector3(this.start.x, this.start.y, this.start.z));
    // this.instance.lookAt(this.target.x, this.target.y, this.target.z);
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    this.controls.rotateSpeed = 0.1;
    this.controls.zoomSpeed = 0.5;
    this.controls.panSpeed = 0.5;
    this.controls.minDistance = 5;
    this.controls.maxDistance = 50;
    this.controls.target.set(this.target.x, this.target.y, this.target.z);
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}

export default Camera;
