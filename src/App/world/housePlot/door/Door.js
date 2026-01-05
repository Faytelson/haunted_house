import * as THREE from "three";
import MeshAssembler from "@world/MeshAssembler";
import { METRICS } from "@world/metrics";

class Door extends MeshAssembler {
  constructor(texture) {
    super(texture);
    this.texture = texture;
    this.createGeometry();
    this.setTexture();
    this.createMaterial();
    this.createMesh();
  }

  createGeometry() {
    this.geometry = new THREE.PlaneGeometry(METRICS.door.width, METRICS.door.height, 50, 50);
  }

  setTexture() {
    this.texture.color.colorSpace = THREE.SRGBColorSpace;
  }

  createMaterial() {
    const texture = this.texture;
    this.material = new THREE.MeshStandardMaterial({
      map: texture.color,
      aoMap: texture.ambientOcclusion,
      aoMapIntensity: 1.0,
      normalMap: texture.normal,
      roughnessMap: texture.roughness,
      displacementMap: texture.displacement,
      displacementScale: 0.1,
      alphaMap: texture.alpha,
      transparent: true,
      metalnessMap: texture.metalness,
      metalness: 0.7,
      side: THREE.DoubleSide,
    });
  }

  createMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = true;
  }
}

export default Door;
