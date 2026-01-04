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
      const overlayTop = document.querySelector(".preloader__overlay_top");
      overlayTop.classList.add("preloader__overlay_top_hidden");
      const overlayBottom = document.querySelector(".preloader__overlay_bottom");
      overlayBottom.classList.add("preloader__overlay_bottom_hidden");
    }, delay);

    const progress = document.querySelector(".preloader__progress");
    progress.classList.add("preloader__progress_invisible");
    const text = document.querySelector(".preloader__text");
    text.classList.add("preloader__text_invisible");
  }
}

export default Preloader;
