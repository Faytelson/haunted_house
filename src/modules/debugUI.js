import GUI from "lil-gui";
import { camera, cameraTarget } from "./sceneSetup";

const gui = new GUI();
gui.add(camera.position, "x").min(-50).max(50).step(0.0001).name("Camera position X");
gui.add(camera.position, "y").min(0).max(30).step(0.0001).name("Camera position Y");
gui.add(camera.position, "z").min(-50).max(50).step(0.0001).name("Camera position Z");
gui.add(cameraTarget, "x").min(-50).max(50).step(0.0001).name("Camera look at X");
gui.add(cameraTarget, "y").min(-50).max(50).step(0.0001).name("Camera look at y");
gui.add(cameraTarget, "z").min(-50).max(50).step(0.0001).name("Camera look at z");
