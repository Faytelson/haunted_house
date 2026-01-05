import * as THREE from "three";
import GardenBed from "@world/housePlot/gardenBeds/GardenBed";
import PlantFactory from "@world/housePlot/gardenBeds/PlantFactory";

class GardenBedManager {
  constructor(bedsData, assets) {
    this.bedsData = bedsData;
    this.assets = assets;
    this.group = new THREE.Group();
    this.createGardenBeds();
  }

  createGardenBeds() {
    this.bedsData.forEach((config) => {
      const metrics = config.calculateMetrics();
      const newConfig = {
        ...config,
        ...metrics,
      };
      const plants = PlantFactory.create(config.plantType, this.assets.models[config.modelRoot]);
      const texture = this.assets.textures[config.texture];
      const bed = new GardenBed(newConfig, texture, plants).getObject();
      this.group.add(bed);
    });
  }

  getObject() {
    return this.group;
  }
}

export default GardenBedManager;
