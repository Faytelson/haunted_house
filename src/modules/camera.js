import * as THREE from "three";
import { sizes } from "./common";

export const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.set(0, 0, 5);
