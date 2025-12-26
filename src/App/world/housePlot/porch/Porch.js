import * as THREE from "three";
import { METRICS } from "@world/metrics";

class Porch {
  constructor(wallsTexture, roofTexture) {
    this.wallsTexture = wallsTexture;
    this.roofTexture = roofTexture;
    this.group = new THREE.Group();
    this.porchWidth = METRICS.door.width + 2 * METRICS.porch.thresholdSideSpace;
    this.porchHeightWithoutAngle =
      METRICS.porch.stepHeight * 2 + METRICS.door.height + METRICS.porch.spaceAbovePorch;
    this.setThresholdMaterial();
    this.createSteps();
    this.createRoofMaterial();
    this.createRoof();
    this.createPillars();
  }

  setThresholdMaterial() {
    const texture = this.wallsTexture;
    const thresholdMaterial = new THREE.MeshStandardMaterial({
      map: texture.color,
      aoMap: texture.ambientOcclusion,
      aoMapIntensity: 1.0,
      normalMap: texture.normal,
      roughnessMap: texture.roughness,
      displacementMap: texture.height,
      displacementScale: 0.002,
      side: THREE.DoubleSide,
    });
    this.thresholdMaterial = thresholdMaterial;
  }

  createSteps() {
    const step1Geometry = new THREE.BoxGeometry(
      this.porchWidth,
      METRICS.porch.stepHeight,
      METRICS.porch.length,
    );
    const step1 = new THREE.Mesh(step1Geometry, this.thresholdMaterial);
    step1.position.y = 0;
    this.group.add(step1);

    const step2Geometry = new THREE.BoxGeometry(
      this.porchWidth,
      METRICS.porch.stepHeight,
      METRICS.porch.length - METRICS.porch.stepDiff,
    );
    const step2 = new THREE.Mesh(step2Geometry, this.thresholdMaterial);
    step2.position.y = METRICS.porch.stepHeight + 0.005;
    step2.position.z = -METRICS.porch.stepDiff / 2;
    this.group.add(step2);
  }

  createRoofMaterial() {
    const texture = this.roofTexture;
    const roofMaterial = new THREE.MeshStandardMaterial({
      map: texture.color,
      aoMap: texture.ambientOcclusion,
      aoMapIntensity: 2.0,
      normalMap: texture.normal,
      roughnessMap: texture.roughness,
      displacementMap: texture.displacement,
      displacementScale: 0.06,
      side: THREE.DoubleSide,
    });
    this.roofMaterial = roofMaterial;
  }

  createRoof() {
    const roofGeometry = new THREE.BoxGeometry(
      this.porchWidth,
      METRICS.porch.roofThickness,
      METRICS.porch.roofLength,
    );
    const porchRoof = new THREE.Mesh(roofGeometry, this.roofMaterial);
    porchRoof.position.y = this.porchHeightWithoutAngle;
    porchRoof.rotation.x = Math.PI / 15;
    this.group.add(porchRoof);
  }

  createPillars() {
    const pillarHeight = this.porchHeightWithoutAngle - METRICS.porch.stepHeight;
    const pillarGeometry = new THREE.CylinderGeometry(
      METRICS.porch.pillarRadius,
      METRICS.porch.pillarRadius,
      pillarHeight - METRICS.porch.roofThickness,
      32,
      32,
      true,
    );
    const pillarLeft = new THREE.Mesh(pillarGeometry, this.thresholdMaterial);
    pillarLeft.position.x = this.porchWidth / 2 - METRICS.porch.pillarRadius;
    pillarLeft.position.y = pillarHeight / 2;
    pillarLeft.position.z = METRICS.porch.length / 2 - METRICS.porch.pillarRadius;
    pillarLeft.rotation.x = Math.PI;
    this.group.add(pillarLeft);

    const pillarRight = pillarLeft.clone();
    pillarRight.position.x = -(this.porchWidth / 2 - METRICS.porch.pillarRadius);
    this.group.add(pillarRight);
  }

  getObject() {
    return this.group;
  }
}

export default Porch;
