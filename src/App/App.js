import * as THREE from "three";
import gsap from "gsap";
import collectInteractables from "@utils/collectInteractables";
// core
import Preloader from "@core/preloader";
import Sizes from "@core/Sizes";
import Loop from "@core/Loop";
import Camera from "@core/camera";
import { cameraOptions } from "@core/camera/cameraOptions";
import Renderer from "@core/renderer";
import AssetLoader from "@core/assetLoader";
import source from "@core/assetLoader/source";
import InputManager from "@core/inputManager";
import Raycaster from "@core/raycaster";
import TooltipManager from "@core/tooltipManager";
import tooltipData from "@core/tooltipManager/tooltipData";
// env
import Environment from "@app/environment";
import config from "@app/environment/config";
// world
import World from "@app/world";

class App {
  constructor(canvas) {
    this.canvas = canvas;
    this.sizes = new Sizes();

    this.preloader = new Preloader();

    this.resize = this.resize.bind(this);
    this.sizes.emitter.on("resize", this.resize);

    this.canvas.addEventListener("dblclick", () => {
      this.setFullScreen(this.canvas);
    });

    this.loop = new Loop();
    this.update = this.update.bind(this);
    this.loop.emitter.on("loop", this.update);

    this.scene = new THREE.Scene();
    this.assetLoader = new AssetLoader(source);
    this.onAssetsLoaded = this.onAssetsLoaded.bind(this);
    this.assetLoader.emitter.on("assetsLoaded", this.onAssetsLoaded);
    this.assetLoader.emitter.on("progress", (progress) => {
      this.preloader.setProgress(progress);
    });

    this.inputManager = new InputManager(this.canvas);
    this.mouse = this.inputManager.getMouse();

    this.cameraManager = new Camera(cameraOptions, this);
    this.renderer = new Renderer(this);
  }

  resize() {
    this.cameraManager.resize();
    this.renderer.resize();
    this.inputManager.getRect();
  }

  update() {
    this.cameraManager.update();
    this.renderer.update();
  }

  onAssetsLoaded() {
    this.environment = new Environment(this, config);
    this.world = new World(this);
    this.environment.updateMaterials();
    this.setInteraction();
    this.hidePreloader();
  }

  setInteraction() {
    this.interactables = collectInteractables(this.scene);
    this.raycaster = new Raycaster(this.interactables);
    this.tooltipManager = new TooltipManager(tooltipData, this.cameraManager.instance, this.sizes);
    this.hit = null;
    this.updateMouse = this.inputManager.updateMousePosition.bind(this.inputManager);

    window.addEventListener("mousemove", (e) => {
      this.updateMouse(e);
      this.updateInteraction();
    });

    window.addEventListener("resize", () => {
      this.updateInteraction();
    });

    window.addEventListener("pointerdown", () => {
      this.tooltipManager.openLink(this.hit?.object.userData.tooltipID);
    });
  }

  updateInteraction() {
    this.raycaster.castFromCamera(this.mouse, this.cameraManager.instance);
    const intersections = this.raycaster.getIntersection();
    this.hit = intersections[0] ?? null;
    this.tooltipManager.setTooltips(this.hit);
  }

  hidePreloader() {
    const overlayTop = document.querySelector(".preloader__overlay_top");
    overlayTop.classList.add("preloader__overlay_top_hidden");
    const overlayBottom = document.querySelector(".preloader__overlay_bottom");
    overlayBottom.classList.add("preloader__overlay_bottom_hidden");

    const progress = document.querySelector(".preloader__progress");
    progress.classList.add("preloader__progress_invisible");
    const text = document.querySelector(".preloader__text");
    text.classList.add("preloader__text_invisible");
  }

  setFullScreen() {
    const doc = document;
    const isFullscreen =
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement;
    if (!isFullscreen) {
      if (this.canvas.requestFullscreen) {
        this.canvas.requestFullscreen();
      } else if (this.canvas.webkitRequestFullscreen) {
        this.canvas.webkitRequestFullscreen();
      } else if (this.canvas.mozRequestFullScreen) {
        this.canvas.mozRequestFullScreen();
      } else if (this.canvas.msRequestFullscreen) {
        this.canvas.msRequestFullscreen();
      }
    } else {
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    }
  }
}

export default App;
