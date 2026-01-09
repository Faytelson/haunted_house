import * as THREE from "three";
import { METRICS } from "@world/metrics";

class FarForest {
  constructor(texture) {
    this.texture = texture;
    this.setTexture();
    this.createGeometry();
    this.createMaterial();
    this.createMesh();
  }

  setTexture() {
    const texture = this.texture;
    for (const key in texture) {
      texture[key].repeat.x = 12;
      texture[key].repeat.y = 1;
      texture[key].wrapS = THREE.RepeatWrapping;
      texture[key].wrapT = THREE.RepeatWrapping;
    }
    texture.color.colorSpace = THREE.SRGBColorSpace;
  }

  createGeometry() {
    this.geometry = new THREE.PlaneGeometry(METRICS.ground.width * 2, METRICS.farForest.height);
  }

  createMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.texture.color,
      transparent: true,
      depthWrite: false,
    });
  }

  createMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  getMesh() {
    return this.mesh;
  }
}

export default FarForest;
