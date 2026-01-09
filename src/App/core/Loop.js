import EventEmitter from "@app/core/EventEmitter";
import Stats from "stats.js";

class Loop {
  constructor() {
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 0;
    this.emitter = new EventEmitter();
    this.loop = this.loop.bind(this);
    // this.setStats();

    this.last = performance.now();

    window.requestAnimationFrame(this.loop);
  }

  loop() {
    // this.stats.begin();
    const current = Date.now();
    this.delta = current - this.current;
    this.current = current;
    this.elapsed = this.current - this.start;

    // const now = performance.now();
    // const frameTime = now - this.last;
    // this.last = now;
    // console.log(frameTime.toFixed(1), "ms");

    this.emitter.emit("loop");
    // this.stats.end();
    window.requestAnimationFrame(this.loop);
  }

  // setStats() {
  //   this.stats = new Stats();
  //   this.stats.showPanel(0);
  //   document.body.appendChild(this.stats.dom);
  // }
}

export default Loop;
