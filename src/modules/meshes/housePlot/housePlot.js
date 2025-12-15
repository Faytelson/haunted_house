import * as THREE from "three";
import { house } from "./house";
import { barn } from "./barn";
import { fence } from "./fence";
import { gardenBedPlants } from "./gardenBeds/gardenBedPlants";
import { gardenBedRibbonGrass } from "./gardenBeds/gardenBedRibbonGrass";
import { gardenBedRealisticGrass } from "./gardenBeds/gardenBedRealisticGrass";
import { treeGroup, berryPlantGroup, grassGroup } from "./housePlants";
import { houseGround } from "./houseGround";

const housePlot = new THREE.Group();
housePlot.add(house);
housePlot.add(barn);
housePlot.add(fence);
housePlot.add(gardenBedPlants);
housePlot.add(gardenBedRibbonGrass);
housePlot.add(gardenBedRealisticGrass);
housePlot.add(treeGroup, berryPlantGroup, grassGroup);
housePlot.add(houseGround);

housePlot.userData.groupID = "housePlot";

export { housePlot };
