import * as THREE from "three";
import { house } from "./house";
import { barn } from "./barn";
import { fence } from "./fence";
import { gardenBedLGGroup } from "./gardenBeds/gardenBedLG";
import { gardenBedMD1Group } from "./gardenBeds/gardenBedMD1";
import { gardenBedMD2Group } from "./gardenBeds/gardenBedMD2";
import { gardenBedMD3Group } from "./gardenBeds/gardenBedMD3";
import { firePitScene } from "./firePit";
import { treeGroup, bushGroup, berryPlantGroup, grassGroup, kalmiaBushGroup } from "./housePlants";
import { houseGround } from "./houseGround";

const housePlot = new THREE.Group();
housePlot.add(house);
housePlot.add(barn);
housePlot.add(fence);
housePlot.add(gardenBedLGGroup);
housePlot.add(gardenBedMD1Group);
housePlot.add(gardenBedMD2Group);
housePlot.add(gardenBedMD3Group);
housePlot.add(firePitScene);
housePlot.add(treeGroup, bushGroup, berryPlantGroup, grassGroup, kalmiaBushGroup);
housePlot.add(houseGround);

export { housePlot };
