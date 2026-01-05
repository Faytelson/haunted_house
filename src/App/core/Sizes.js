import EventEmitter from "@app/core/EventEmitter";

class Sizes {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.emitter = new EventEmitter();

    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.emitter.emit("resize");
    });
  }
}

export default Sizes;
