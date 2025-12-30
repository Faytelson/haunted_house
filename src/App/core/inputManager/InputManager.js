import * as THREE from "three";

class InputManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.mouse = new THREE.Vector2();
  }

  updateMousePosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    let x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    let y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    x = Math.max(-1, Math.min(1, x));
    y = Math.max(-1, Math.min(1, y));

    this.mouse.set(x, y);
  }

  getMouse() {
    return this.mouse;
  }
}

export default InputManager;
