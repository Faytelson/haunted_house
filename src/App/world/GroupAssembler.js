import * as THREE from "three";

class GroupAssembler {
  constructor(assets) {
    this.assets = assets;
    this.group = new THREE.Group();
  }

  enableShadows(cast, receive) {
    this.group.traverse((child) => {
      if (child.isMesh) {
        if (cast) child.castShadow = true;
        if (receive) child.receiveShadow = true;
      }
    });
  }

  getObject() {
    return this.group;
  }
}

export default GroupAssembler;
