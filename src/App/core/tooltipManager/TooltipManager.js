import * as THREE from "three";

class TooltipManager {
  constructor(tooltipSrc, interactables, camera, sizes) {
    this.tooltipSrc = tooltipSrc;
    this.interactables = interactables;
    this.camera = camera;
    this.sizes = sizes;
    this.setTooltipData();
  }

  setTooltipData() {
    this.tooltips = [];
    this.tooltipSrc.forEach((t) => {
      const interactable = this.interactables.filter(
        (i) => i.userData.tooltipID === t.tooltipID,
      )[0];
      const obj = {
        ...t,
        elem: document.querySelector(`.label_${t.labelID}`),
        anchor: interactable.userData.anchor,
      };
      this.tooltips.push(obj);
    });
  }

  updateTooltips(intersect) {
    if (!intersect) this.setLabelVisibility(null);
    this.tooltips.forEach((t) => {
      this.updateLabelPosition(t.anchor, t.elem, this.camera, this.sizes);
      if (t.tooltipID === intersect?.object.userData.tooltipID) {
        this.setLabelVisibility(t.elem);
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
    object.getWorldPosition(vector);
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
        window.open("https://3dobjects-seven.vercel.app/", "_blank");
        break;
    }
    return;
  }
}

export default TooltipManager;
