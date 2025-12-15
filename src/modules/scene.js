import * as THREE from "three";
import { gsap } from "gsap";
import { fullScene } from "./meshes/fullScene";
import { cubeTextureLoader } from "./loaders";
import {
  houseObjectsToIntersect,
  barnObjectsToIntersect,
  treesObjectsToIntersect,
  portfolioLabel,
  objectsLabel,
  foodLabel,
} from "./intersectionObjects";
import { updateLabelPosition } from "../utils";
import {
  tooltipAnchorHouse as tooltipHouse,
  tooltipAnchorBarn as tooltipBarn,
  tooltipAnchorTree as tooltipTree,
} from "./meshes/tooltips";

// common settings
const canvas = document.querySelector(".app__webgl");
const sizes = { width: window.innerWidth, height: window.innerHeight };

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
sunLight.shadow.mapSize.set(1024, 1024);
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 70;
sunLight.shadow.camera.left = -50;
sunLight.shadow.camera.right = 50;
sunLight.shadow.camera.top = 50;
sunLight.shadow.camera.bottom = -50;
sunLight.shadow.bias = -0.0001;
scene.add(sunLight);

// camera
const cameraStart = new THREE.Vector3(-10, 17, 39);
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 3000);
camera.position.set(cameraStart.x, cameraStart.y, cameraStart.z);
scene.add(camera);
const cameraTarget = { x: 0.34, y: 7, z: -2 };
camera.lookAt(cameraTarget.x, cameraTarget.y, cameraTarget.z);

// анимация камеры
gsap.to(camera.position, { duration: 7, x: -2, y: 10, z: 34, ease: "power1.inOut" });
tooltipHouse.quaternion.copy(camera.quaternion);
tooltipBarn.quaternion.copy(camera.quaternion);
tooltipTree.quaternion.copy(camera.quaternion);

// renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.render(scene, camera);

// raycaster
const raycaster = new THREE.Raycaster();
const input = {
  mouse: new THREE.Vector2(),
  pointerDown: false,
};

let canvasRect = canvas.getBoundingClientRect();

function updateMousePosition(event) {
  input.mouse.x = ((event.clientX - canvasRect.left) / canvasRect.width) * 2 - 1;
  input.mouse.y = -((event.clientY - canvasRect.top) / canvasRect.height) * 2 + 1;
}

window.addEventListener("mousemove", updateMousePosition);

window.addEventListener("pointerdown", (e) => {
  updateMousePosition(e);
  input.pointerDown = true;
});

window.addEventListener("pointerup", () => {
  input.pointerDown = false;
});

// resize
function onWindowResize() {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  canvasRect = canvas.getBoundingClientRect();
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
      canvas.webkitRequestFullscreen();
    } else if (canvas.mozRequestFullScreen) {
      canvas.mozRequestFullScreen();
    } else if (canvas.msRequestFullscreen) {
      canvas.msRequestFullscreen();
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

// loop
const loop = () => {
  camera.lookAt(cameraTarget.x, cameraTarget.y, cameraTarget.z);

  raycaster.setFromCamera(input.mouse, camera);
  const houseIntersects = raycaster.intersectObjects(houseObjectsToIntersect);
  portfolioLabel.classList.toggle("label_visible", houseIntersects.length > 0);
  const barnIntersects = raycaster.intersectObjects(barnObjectsToIntersect);
  foodLabel.classList.toggle("label_visible", barnIntersects.length > 0);
  const treesIntersects = raycaster.intersectObjects(treesObjectsToIntersect);
  objectsLabel.classList.toggle("label_visible", treesIntersects.length > 0);

  if (input.pointerDown) {
    if (houseIntersects.length) {
      window.open("https://hh.ru/resume/42e2d626ff0937187c0039ed1f7a587437656e", "_blank");
    }
    if (barnIntersects.length) {
      window.open("https://food-red-six.vercel.app/", "_blank");
    }
    if (treesIntersects.length) {
      window.open("https://hh.ru/resume/42e2d626ff0937187c0039ed1f7a587437656e", "_blank");
    }

    input.pointerDown = false;
  }

  updateLabelPosition(tooltipHouse, portfolioLabel, camera, sizes);
  updateLabelPosition(tooltipBarn, foodLabel, camera, sizes);
  updateLabelPosition(tooltipTree, objectsLabel, camera, sizes);

  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
export { camera, cameraTarget, sizes };
