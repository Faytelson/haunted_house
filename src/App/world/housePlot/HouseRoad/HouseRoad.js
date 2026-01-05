import * as THREE from "three";
import MeshAssembler from "@world/MeshAssembler";
import { METRICS } from "@world/metrics";

class HouseRoad extends MeshAssembler {
  constructor(texture) {
    super(texture);
    this.width = METRICS.fence.gatesWidth - METRICS.houseRoad.offset;
    this.createGeometry();
    this.setTexture();
    this.createMaterial();
    this.createMesh();
  }

  createGeometry() {
    this.geometry = new THREE.PlaneGeometry(this.width, METRICS.houseRoad.length, 50, 150);
  }

  setTexture() {
    const texture = this.texture;
    for (const key in texture) {
      texture[key].repeat.x = 1;
      texture[key].repeat.y = 20;
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
      aoMap: texture.ambientOcclusion,
      aoMapIntensity: 2,
      displacementMap: texture.displacement,
      displacementScale: 0.06,
    });
  }

  createMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.receiveShadow = true;
  }
}

export default HouseRoad;
