import * as THREE from "three";

class TooltipManager {
  constructor(tooltipSrc, camera, sizes) {
    this.tooltipSrc = tooltipSrc;
    this.camera = camera;
    this.sizes = sizes;
    this.setHTMLElements();
  }

  setHTMLElements() {
    this.tooltips = [];
    this.tooltipSrc.forEach((t) => {
      const obj = {
        ...t,
        elem: document.querySelector(`.label_${t.labelID}`),
      };
      this.tooltips.push(obj);
    });
  }

  setTooltips(intersect) {
    if (!intersect) this.setLabelVisibility(null);
    this.tooltips.forEach((t) => {
      if (t.tooltipID === intersect?.object.userData.tooltipID) {
        const anchor = intersect?.object.userData.anchor;
        t.elem.classList.add("label_visible");
        this.setLabelVisibility(t.elem);
        this.updateLabelPosition(anchor, t.elem, this.camera, this.sizes);
      }
    });
  }

  setLabelVisibility(elem) {
    if (elem === null) {
      if (this.currentVisible) {
        this.currentVisible.classList.remove("label_visible");
        this.currentVisible = null;
      }
      return;
    }

    if (this.currentVisible === elem) return;

    if (this.currentVisible) {
      this.currentVisible.classList.remove("label_visible");
    }
    elem.classList.add("label_visible");
    this.currentVisible = elem;
    return;
  }

  updateLabelPosition(object, labelEl, camera, sizes) {
    const vector = new THREE.Vector3();
    vector.copy(object.position);
    vector.project(camera);

    const x = ((vector.x + 1) / 2) * sizes.width;
    const y = ((vector.y + 1) / 2) * sizes.height;

    labelEl.style.transform = `translate(${x}px, ${y}px)`;
  }

  openLink(linkID) {
    switch (linkID) {
      case "house":
        window.open("https://hh.ru/resume/42e2d626ff0937187c0039ed1f7a587437656e", "_blank");
        break;
      case "barn":
        window.open("https://food-red-six.vercel.app/", "_blank");
        break;
      case "tree":
        window.open("https://hh.ru/resume/42e2d626ff0937187c0039ed1f7a587437656e", "_blank");
        break;
    }
    return;
  }
}

export default TooltipManager;
