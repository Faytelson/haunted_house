import * as THREE from "three";

class GroupAssembler {
  constructor(assets) {
    this.assets = assets;
    this.group = new THREE.Group();
  }

  enableShadows() {
    this.group.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  getObject() {
    return this.group;
  }
}

export default GroupAssembler;
