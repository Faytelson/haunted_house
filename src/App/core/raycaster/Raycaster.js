import * as THREE from "three";

class Raycaster {
  constructor(objects) {
    this.objects = objects;
    this.raycaster = new THREE.Raycaster();
  }

  castAt(origin, direction) {
    this.raycaster.set(origin, direction);
  }

  castFromCamera(mouseVector, camera) {
    this.raycaster.setFromCamera(mouseVector, camera);
  }

  getIntersection() {
    const intersects = this.raycaster.intersectObjects(this.objects);
    return intersects;
  }

  updateObjects(objects) {
    this.objects = objects;
  }
}

export default Raycaster;
