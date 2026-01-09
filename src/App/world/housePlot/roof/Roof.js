import * as THREE from "three";
import { METRICS } from "@world/metrics";

class Roof {
  constructor(texture, type = "angle") {
    this.texture = texture;
    this.group = new THREE.Group();
    this.setTexture();
    this.createMaterial();
    if (type === "angle") this.createAngleRoof();
    else if (type === "plane") this.createPlaneRoof();
    this.enableShadows();
  }

  setTexture() {
    const texture = this.texture;
    for (const key in texture) {
      texture[key].repeat.x = 4;
      texture[key].repeat.y = 2;
      texture[key].wrapS = THREE.RepeatWrapping;
      texture[key].wrapT = THREE.RepeatWrapping;
    }
    texture.color.colorSpace = THREE.SRGBColorSpace;
  }

  createMaterial() {
    const texture = this.texture;
    this.material = new THREE.MeshStandardMaterial({
      map: texture.color,
      aoMap: texture.ambientOcclusion,
      aoMapIntensity: 2.0,
      normalMap: texture.normal,
      roughness: 0.8,
      metalness: 0.1,
      displacementMap: texture.displacement,
      displacementScale: 0.06,
    });
  }

  // angle roof
  setMetrics() {
    this.slopeHeight = Math.sqrt(
      (METRICS.house.width / 2) ** 2 + METRICS.house.secondFloorHeight ** 2,
    );
    this.slopeHeightWithOffset = this.slopeHeight + METRICS.roof.slopeOffset;
    this.slopeAngle = Math.acos(METRICS.house.width / 2 / this.slopeHeight);
  }

  createSlopeGeometry() {
    this.geometry = new THREE.BoxGeometry(
      METRICS.house.length + METRICS.roof.offsetByLength,
      this.slopeHeightWithOffset,
      METRICS.roof.depth,
      20,
      20,
    );
  }

  createLeftSlope() {
    this.leftSlope = new THREE.Mesh(this.geometry, this.material);

    const { slopeOffsetX, slopeOffsetY, slopeOffsetX2, slopeOffsetY2 } = this.getOffsets();
    this.leftSlope.geometry.rotateY(Math.PI / 2);
    this.leftSlope.rotation.z = -(Math.PI / 2 - this.slopeAngle);
    this.leftSlope.position.x = -slopeOffsetX - slopeOffsetX2;
    this.leftSlope.position.y = slopeOffsetY - slopeOffsetY2;

    this.group.add(this.leftSlope);
  }

  createRightSlope() {
    this.rightSlope = this.leftSlope.clone();

    const { slopeOffsetX, slopeOffsetX2 } = this.getOffsets();
    this.rightSlope.rotation.z = Math.PI / 2 - this.slopeAngle;
    this.rightSlope.position.x = slopeOffsetX + slopeOffsetX2;

    this.group.add(this.rightSlope);
  }

  createAngleRoof() {
    this.setMetrics();
    this.createSlopeGeometry();
    this.createLeftSlope();
    this.createRightSlope();
  }

  getOffsets() {
    const [x, y] = this.getOffsetByAngle(this.slopeHeight / 2, this.slopeAngle);
    const [x2, y2] = this.getOffsetByAngle(METRICS.roof.slopeOffset / 2, this.slopeAngle);
    return { slopeOffsetX: x, slopeOffsetY: y, slopeOffsetX2: x2, slopeOffsetY2: y2 };
  }

  getOffsetByAngle(length, angle) {
    return [length * Math.cos(angle), length * Math.sin(angle)];
  }

  // plane roof
  createBoxGeometry() {
    this.geometry = new THREE.BoxGeometry(
      METRICS.barn.width + METRICS.barn.roofOffsetX,
      0.15,
      METRICS.barn.length + METRICS.barn.roofOffsetZ,
      20,
      20,
      20,
    );
  }

  createPlaneRoof() {
    this.createBoxGeometry();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.group.add(this.mesh);
  }

  enableShadows() {
    this.group.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });
  }

  getObject() {
    return this.group;
  }
}

export default Roof;
