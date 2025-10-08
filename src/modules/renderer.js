import * as THREE from "three";
import { sizes } from "./common";
import { camera } from "./camera";
import { scene } from "./scene";

const canvas = document.querySelector(".app__webgl");
export const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
