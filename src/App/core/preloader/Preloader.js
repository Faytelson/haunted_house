import gsap from "gsap";

class Preloader {
  constructor() {
    this.setProgressElement();
    this.targetProgress = 0;
    this.visualProgress = 0;
    gsap.ticker.add(this.update.bind(this));
  }

  setProgressElement() {
    this.progressElement = document.querySelector(".preloader__progress");
  }

  setProgress(progress) {
    this.targetProgress = progress;
  }

  update() {
    this.visualProgress += (this.targetProgress - this.visualProgress) * 0.1;
    this.progressElement.style.transform = `scaleX(${this.visualProgress})`;
  }
}

export default Preloader;
