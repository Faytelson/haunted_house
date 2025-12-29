import * as THREE from "three";
import { METRICS } from "@world/metrics";

class Fence {
  constructor(texture) {
    this.texture = texture;
    this.group = new THREE.Group();
    this.setTexture();
    this.createMaterial();
    this.createFront();
    this.createBackAndSides();
    this.createLeftGate();
    this.createRightGate();
    this.enableShadows();
  }

  setTexture() {
    const texture = this.texture;
    const wrapX = 5;
    for (const key in texture) {
      texture[key].repeat.x = wrapX;
      texture[key].wrapS = THREE.RepeatWrapping;
      texture[key].wrapT = THREE.ClampToEdgeWrapping;
    }
    texture.color.colorSpace = THREE.SRGBColorSpace;
  }

  createMaterial() {
    const texture = this.texture;
    this.material = new THREE.MeshStandardMaterial({
      map: texture.color,
      alphaMap: texture.alpha,
      aoMap: texture.ambientOcclusion,
      aoMapIntensity: 1.0,
      normalMap: texture.normal,
      roughnessMap: texture.roughness,
      displacementMap: texture.displacement,
      displacementScale: 0.001,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }

  createFront() {
    const geometry = new THREE.BoxGeometry(
      METRICS.fence.width / 2 - METRICS.fence.gatesWidth / 2,
      METRICS.fence.height,
      METRICS.fence.thickness,
      50,
      50,
      50,
    );
    const right = this.createFenceHalf(geometry, this.material);
    this.group.add(right);

    const left = this.createFenceHalf(geometry, this.material, true);
    this.group.add(left);
  }

  createBackAndSides() {
    const back = this.createFenceFull({
      x: 0,
      y: METRICS.fence.height / 2,
      z: -(METRICS.fence.width / 2 - METRICS.fence.thickness),
    });
    this.group.add(back);

    const right = this.createFenceFull({
      x: METRICS.fence.width / 2 + METRICS.fence.thickness,
      y: METRICS.fence.height / 2,
      z: 0,
    });
    right.rotation.y = Math.PI / 2;
    this.group.add(right);

    const left = this.createFenceFull({
      x: -(METRICS.fence.width / 2 + METRICS.fence.thickness),
      y: METRICS.fence.height / 2,
      z: 0,
    });
    left.rotation.y = Math.PI / 2;
    this.group.add(left);
  }

  createLeftGate() {
    const angle = -Math.PI / 8;
    const leftGate = this.createGatesHalf(angle, {
      x: -METRICS.fence.gatesWidth / 2 + Math.cos(angle) * (METRICS.fence.gatesWidth / 4),
      z:
        METRICS.fence.width / 2 -
        METRICS.fence.thickness -
        Math.sin(angle) * (METRICS.fence.gatesWidth / 4),
    });
    this.group.add(leftGate);
  }

  createRightGate() {
    const angle = Math.PI / 18;
    const rightGate = this.createGatesHalf(angle, {
      x: METRICS.fence.gatesWidth / 2 - Math.cos(angle) * (METRICS.fence.gatesWidth / 4),
      z:
        METRICS.fence.width / 2 -
        METRICS.fence.thickness +
        Math.sin(angle) * (METRICS.fence.gatesWidth / 4),
    });
    this.group.add(rightGate);
  }

  createFenceHalf(geometry, material, left) {
    const half = new THREE.Mesh(geometry, material);
    let x = METRICS.fence.width / 4 + METRICS.fence.gatesWidth / 4;
    if (left) x *= -1;
    const y = METRICS.fence.height / 2;
    const z = METRICS.fence.width / 2 - METRICS.fence.thickness;
    half.position.set(x, y, z);
    return half;
  }

  createFenceFull(positions) {
    const full = new THREE.Mesh(
      new THREE.BoxGeometry(METRICS.fence.width, METRICS.fence.height, METRICS.fence.thickness),
      this.material,
    );
    const { x, y, z } = positions;
    full.position.set(x, y, z);
    return full;
  }

  createGatesHalf(angle, positions) {
    this.gatesHeight = METRICS.fence.height - 0.5;
    const geometry = new THREE.BoxGeometry(
      METRICS.fence.gatesWidth / 2,
      this.gatesHeight,
      METRICS.fence.thickness,
    );
    const mesh = new THREE.Mesh(geometry, this.material);
    const { x, z } = positions;
    mesh.position.set(x, this.gatesHeight / 2, z);
    mesh.rotation.y = angle;
    return mesh;
  }

  enableShadows() {
    this.group.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  getObject() {
    return this.group;
  }
}

export default Fence;
