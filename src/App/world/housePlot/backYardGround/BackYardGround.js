import * as THREE from "three";
import MeshAssembler from "@world/MeshAssembler";
import { METRICS } from "@world/metrics";

class BackYardGround extends MeshAssembler {
  constructor(texture) {
    super(texture);
    this.length = METRICS.fence.width / 2 - METRICS.house.length / 2;
    this.createGeometry();
    this.setTexture();
    this.createMaterial();
    this.createMesh();
  }

  createGeometry() {
    this.geometry = new THREE.PlaneGeometry(
      METRICS.fence.width - METRICS.backYard.offset,
      this.length,
      50,
      17,
    );
    this.geometry.setAttribute(
      "uv2",
      new THREE.BufferAttribute(this.geometry.attributes.uv.array, 2),
    );
    for (let i = 0; i < this.geometry.attributes.position.count; i++) {
      const z = Math.random() * 0.15;
      this.geometry.attributes.position.setZ(i, z);
    }
    this.geometry.computeVertexNormals();
  }

  setTexture() {
    const src = this.texture;

    this.clonedTexture = {
      color: src.color.clone(),
      normal: src.normal.clone(),
      roughness: src.roughness.clone(),
      displacement: src.displacement.clone(),
    };

    for (const key in this.clonedTexture) {
      const t = this.clonedTexture[key];
      t.repeat.set(4, 3);
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
      t.needsUpdate = true;
    }

    this.clonedTexture.color.colorSpace = THREE.SRGBColorSpace;
  }

  createMaterial() {
    const texture = this.clonedTexture;
    this.material = new THREE.MeshStandardMaterial({
      map: texture.color,
      normalMap: texture.normal,
      roughnessMap: texture.roughness,
      displacementMap: texture.displacement,
      displacementScale: 0.1,
    });
  }

  createMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.receiveShadow = true;
  }

  getLength() {
    return this.length;
  }
}

export default BackYardGround;
