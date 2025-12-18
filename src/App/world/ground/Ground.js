import * as THREE from "three";

class Ground {
  constructor(assets) {
    this.assets = assets;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(150, 200);
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
    this.mesh.position.z = -50;
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;
  }

  getMesh() {
    return this.mesh;
  }
}

export default Ground;
