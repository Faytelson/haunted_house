import * as THREE from "three";
import MeshAssembler from "@world/MeshAssembler";
import { METRICS } from "@world/metrics";

class Walls extends MeshAssembler {
  constructor(texture) {
    super(texture);
    this.texture = texture;
    this.createGeometry();
    this.setTexture();
    this.createMaterial();
    this.createMesh();
  }

  createGeometry() {
    this.geometry = new THREE.BoxGeometry(
      METRICS.house.width,
      METRICS.house.firstFloorHeight,
      METRICS.house.length,
      50,
      50,
      50,
    );
  }

  setTexture() {
    const texture = this.texture;
    for (const key in texture) {
      texture[key].repeat.x = 2.5;
      texture[key].wrapS = THREE.RepeatWrapping;
      texture[key].wrapT = THREE.ClampToEdgeWrapping;
      texture[key].offset.x = 0.32;
    }
    texture.color.colorSpace = THREE.SRGBColorSpace;
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
      displacementScale: 0.002,
      side: THREE.DoubleSide,
    });
  }

  createMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
}

export default Walls;
