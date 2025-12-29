import * as THREE from "three";
import Soil from "@world/housePlot/gardenBeds/Soil";

class GardenBed {
  constructor(config, texture, plants) {
    this.config = config;
    this.texture = texture;
    this.plants = plants;
    this.group = new THREE.Group();
    if (config.position) {
      this.group.position.set(config.x, 0, config.z);
    }
    this.createSoil();
    this.addPlant();
  }

  createSoil() {
    this.soil = new Soil(this.config, this.texture).getMesh();
    this.group.add(this.soil);
  }

  addPlant() {
    const { width: bedWidth, length: bedLength, plantsOffsetX, plantsOffsetY, plantsOffsetZ } = this.config;
    this.plants.position.x = this.soil.position.x - bedWidth / 2 + plantsOffsetX;
    this.plants.position.y = plantsOffsetY || 0;
    this.plants.position.z = this.soil.position.z - bedLength / 2 + plantsOffsetZ;
    this.group.add(this.plants);
  }

  getObject() {
    return this.group;
  }
}

export default GardenBed;
