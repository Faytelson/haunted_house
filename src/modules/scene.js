import * as THREE from "three";
import { gsap } from "gsap";
import { fullScene } from "./meshes/fullScene";
import { cubeTextureLoader } from "./loaders";
// import { OrbitControls } from "three/examples/jsm/Addons.js";

// common settings
const canvas = document.querySelector(".app__webgl");
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// scene
const scene = new THREE.Scene();
const sky = await cubeTextureLoader.loadAsync([
  "px.png",
  "nx.png",
  "py.png",
  "ny.png",
  "pz.png",
  "nz.png",
]);
scene.background = sky;
scene.add(fullScene);

// lights
const ambientLight = new THREE.AmbientLight(0xfff4e5, 0.25);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffc27a, 2.8);
sunLight.position.set(20, 20, 30);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 70;
sunLight.shadow.camera.left = -50;
sunLight.shadow.camera.right = 50;
sunLight.shadow.camera.top = 50;
sunLight.shadow.camera.bottom = -50;
sunLight.shadow.bias = -0.0001;
scene.add(sunLight);

// helpers & controls
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

const lightHelper = new THREE.DirectionalLightHelper(sunLight, 5);
scene.add(lightHelper);

// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// camera
const cameraStart = new THREE.Vector3(-10, 17, 39);
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 3000);
camera.position.set(cameraStart.x, cameraStart.y, cameraStart.z);
scene.add(camera);

const cameraTarget = {
  x: 0.34,
  y: 7,
  z: -2,
};

// camera animation
gsap.to(camera.position, {
  duration: 12,
  x: 0,
  y: 14,
  z: 34,
  ease: "power2.out",
});

// resize
function onWindowResize() {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
window.addEventListener("resize", onWindowResize);

// fullscreen dblclick
canvas.addEventListener("dblclick", () => {
  const doc = document;
  const isFullscreen =
    doc.fullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.mozFullScreenElement ||
    doc.msFullscreenElement;

  if (!isFullscreen) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen(); // Safari
    } else if (canvas.mozRequestFullScreen) {
      canvas.mozRequestFullScreen(); // Firefox старый
    } else if (canvas.msRequestFullscreen) {
      canvas.msRequestFullscreen(); // IE/Edge старый
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
});

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.render(scene, camera);

// animation
const loop = () => {
  // controls.target.set(cameraTarget.x, cameraTarget.y, cameraTarget.z);
  // controls.update();
  camera.lookAt(cameraTarget.x, cameraTarget.y, cameraTarget.z);
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

export { camera, cameraTarget };
