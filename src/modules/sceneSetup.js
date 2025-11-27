import * as THREE from "three";
import { fullScene } from "./meshes/fullScene";
import { sky } from "./sky";
import { gsap } from "gsap/gsap-core";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// common settings
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const canvas = document.querySelector(".app__webgl");

// scene
const scene = new THREE.Scene();
scene.add(sky);

// camera
export const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 1000);
camera.position.set(0, 10, 30); //remove
// camera.position.set(0, 20, 50);
scene.add(camera);

// gsap.to(camera.position, {
//   duration: 8,
//   z: 30,
//   y: 10,
//   ease: "back.inOut(4)",
// });

// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xfff8dc, 4);
sunLight.position.set(10, 30, 10);
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

// meshes
scene.add(fullScene);

// helpers
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

const lightHelper = new THREE.DirectionalLightHelper(sunLight, 5);
scene.add(lightHelper);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// resize
function onWindowResize() {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // camera update
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  // renderer
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
const clock = new THREE.Clock();
const loop = () => {
  // анимация вращения всех объектов
  const elapsedTime = clock.getElapsedTime();
  // fullScene.rotation.y = (elapsedTime * Math.PI) / 12;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
