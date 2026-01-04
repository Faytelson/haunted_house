import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import EventEmitter from "@core/EventEmitter";

class Camera {
  constructor(options, app) {
    this.fov = options.fov || 60;
    this.near = options.near || 0.1;
    this.far = options.far || 1000;
    this.start = options.start || { x: 0, y: 20, z: 90 };
    this.target = options.target || { x: 0, y: 0, z: 0 };
    this.end = options.end || { x: 0, y: 15, z: 75 };
    this.finalTarget = options.finalTarget || { x: 0, y: 0, z: 0 };
    this.duration = options.duration || 7;
    this.easing = options.easing || "power1.inOut";
    this.sizes = app.sizes;
    this.canvas = app.canvas;
    this.scene = app.scene;
    this.emitter = new EventEmitter();

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
    this.scene.add(this.instance);
  }

  animate() {
    gsap.to(this.instance.position, {
      duration: this.duration,
      x: this.end.x,
      y: this.end.y,
      z: this.end.z,
      ease: this.easing,
      onComplete: () => {
        this.emitter.emit("animationComplete");
      },
    });
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.rotateSpeed = 0.1;
    this.controls.zoomSpeed = 0.1;
    this.controls.minDistance = this.end.z - 10;
    this.controls.maxDistance = this.start.z;
    this.controls.minPolarAngle = Math.PI / 2;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.enablePan = false;
    this.controls.minAzimuthAngle = -Math.PI / 12;
    this.controls.maxAzimuthAngle = Math.PI / 12;
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
