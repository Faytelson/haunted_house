import * as THREE from "three";
import ambientLight from "@lights/ambientLight";
import sunlight from "@lights/sunLight";
import camera from "@setup/camera";

const scene = new THREE.Scene();
scene.add(ambientLight);
scene.add(sunlight);
scene.add(camera);