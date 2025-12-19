import * as THREE from "three";
import { METRICS } from "@world/metrics";

class Ground {
  constructor(texture) {
    this.texture = texture;
    this.createGeometry();
    this.setTexture();
    this.createMaterial();
    this.createMesh();
  }

  createGeometry() {
    this.geometry = new THREE.PlaneGeometry(METRICS.ground.width, METRICS.ground.height);
  }

  setTexture() {
    const texture = this.texture;
    for (const key in texture) {
      texture[key].repeat.x = 40;
      texture[key].repeat.y = 40;
      texture[key].wrapS = THREE.RepeatWrapping;
      texture[key].wrapT = THREE.RepeatWrapping;
    }
    texture.color.colorSpace = THREE.SRGBColorSpace;
  }

  createMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.texture.color,
      normalMap: this.texture.normal,
      roughnessMap: this.texture.roughness,
    });
  }

  createMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  getMesh() {
    return this.mesh;
  }
}

export default Ground;
