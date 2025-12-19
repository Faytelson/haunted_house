import * as THREE from "three";
import { METRICS } from "@world/metrics";

class Ground {
  constructor(assets) {
    this.assets = assets;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(METRICS.ground.width, METRICS.ground.height);
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.assets.textures.grassTexture.color,
      normalMap: this.assets.textures.grassTexture.normal,
      roughnessMap: this.assets.textures.grassTexture.roughness,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;
  }

  getMesh() {
    return this.mesh;
  }
}

export default Ground;
