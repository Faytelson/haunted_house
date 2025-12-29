import BigLeaves from "@world/housePlot/gardenBeds/plants/bigLeaves";
import RealisticGrass from "@world/housePlot/gardenBeds/plants/realisticGrass";
import RibbonGrass from "@world/housePlot/gardenBeds/plants/ribbonGrass";

class PlantFactory {
  constructor() {
    this.plantTypes = {
      bigLeaves: BigLeaves,
      realisticGrass: RealisticGrass,
      ribbonGrass: RibbonGrass,
    };
  }

  create(type, modelRoot) {
    if (!type) {
      throw new Error(`Cannot find type ${type} in PlantFactory types`);
    }
    const PlantClass = this.plantTypes[type];
    const plantInstance = new PlantClass(modelRoot);
    return plantInstance.getObject();
  }
}

export default new PlantFactory();
