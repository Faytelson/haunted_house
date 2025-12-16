import { gsap } from "gsap";
import { camera } from "@setup/camera";

const cameraAnimate = () => {
  gsap.to(camera.position, { duration: 7, x: -2, y: 10, z: 34, ease: "power1.inOut" });
};

export default cameraAnimate;
