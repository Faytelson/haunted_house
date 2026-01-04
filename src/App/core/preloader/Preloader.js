import gsap from "gsap";

class Preloader {
  constructor() {
    this.progress = 0;
    this.setProgressElement();
  }

  setProgressElement() {
    this.progressElement = document.querySelector(".preloader__progress");
  }

  setProgress(progress) {
    gsap.to(this, {
      progress: progress,
      duration: 0.4,
      ease: "circ.in",
      onUpdate: () => {
        this.progressElement.style.transform = `scaleX(${this.progress})`;
      },
    });
  }

  hide(delay) {
    setTimeout(() => {
      const overlay = document.querySelector(".preloader__overlay");
      overlay.classList.add("preloader__overlay_hidden");
    }, delay);

    const progress = document.querySelector(".preloader__progress");
    progress.classList.add("preloader__progress_invisible");
    const text = document.querySelector(".preloader__text");
    text.classList.add("preloader__text_invisible");
  }
}

export default Preloader;
