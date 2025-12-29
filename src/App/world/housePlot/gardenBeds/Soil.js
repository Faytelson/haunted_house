import * as THREE from "three";

class Soil {
  constructor(config, texture) {
    this.config = config;
    this.texture = texture;
    this.setTexture();
    this.createMaterial();
    this.createMesh();
  }

  setTexture() {
    const texture = this.texture;
    for (const key in texture) {
      texture[key].repeat.x = 3;
      texture[key].repeat.y = 3;
      texture[key].wrapS = THREE.RepeatWrapping;
      texture[key].wrapT = THREE.RepeatWrapping;
    }
    texture.color.colorSpace = THREE.SRGBColorSpace;
  }

  createMaterial() {
    const texture = this.texture;
    this.material = new THREE.MeshStandardMaterial({
      map: texture.color,
      normalMap: texture.normal,
      displacementMap: texture.displacement,
      displacementScale: 0.3,
    });
  }

  createMesh() {
    const { width, length, segmentsX, segmentsY, x = 0, y = 0, z = 0 } = this.config;
    const geometry = new THREE.PlaneGeometry(width, length, segmentsX, segmentsY);
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
    this.mesh.receiveShadow = true;
  }

  getMesh() {
    return this.mesh;
  }
}

export default Soil;
