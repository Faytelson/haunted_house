const cameraOptions = {
  fov: 60,
  near: 0.1,
  far: 3000,
  start: { x: -10, y: 0, z: 80 },
  end: { x: 0, y: 0, z: 65 },
  target: { x: 0, y: 7, z: -2 },
  finalTarget: { x: 1, y: 62, z: -2 },
  duration: 8,
  easing: "power2.inOut",
};

export { cameraOptions };
