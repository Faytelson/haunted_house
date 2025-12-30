import * as THREE from "three";

class TooltipManager {
  constructor(tooltips) {
    this.tooltips = tooltips;
  }

  setHTMLElements() {
    this.elements = [];
    this.tooltips.forEach((t) => {
      const elem = document.querySelector(`.label_${t.labelID}`);
      this.elements.push(elem);
    });
  }

  setTooltips(intersect) {
    this.tooltips.forEach((t) => {
      if (t.tooltipID === intersect?.object.userData.tooltipID) {
        console.log(intersect?.object.userData.anchor);
      }
    });
  }
}

export default TooltipManager;
