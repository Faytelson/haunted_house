function onWindowResize( renderer, canvas) {
  canvasRect = canvas.getBoundingClientRect();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

export default onWindowResize;
