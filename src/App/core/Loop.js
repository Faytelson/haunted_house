import EventEmitter from "@app/core/EventEmitter";

class Loop {
  constructor() {
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 0;
    this.emitter = new EventEmitter();
    this.loop = this.loop.bind(this);
    window.requestAnimationFrame(this.loop);
  }

  loop() {
    const current = Date.now();
    this.delta = current - this.current;
    this.current = current;
    this.elapsed = this.current - this.start;
    this.emitter.emit("loop");
    window.requestAnimationFrame(this.loop);
  }
}

export default Loop;
