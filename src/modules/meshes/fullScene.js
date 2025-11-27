import * as THREE from "three";
import { ground } from "./ground";
import { house } from "./house";
import { fence } from "./fence";
import { gardenBedLGGroup } from "./gardenBeds/gardenBedLG";
import { gardenBedMD1Group } from "./gardenBeds/gardenBedMD1";
import { gardenBedMD2Group } from "./gardenBeds/gardenBedMD2";
import { gardenBedMD3Group } from "./gardenBeds/gardenBedMD3";
import {
  treeGroup,
  bushGroup,
  berryPlantGroup,
  grassGroup,
  forestTreesScene1,
  kalmiaBushGroup,
} from "./plants";

export const fullScene = new THREE.Group();
fullScene.add(
  ground,
  house,
  fence,
  gardenBedLGGroup,
  gardenBedMD1Group,
  gardenBedMD2Group,
  gardenBedMD3Group,
  forestTreesScene1,
  treeGroup,
  bushGroup,
  berryPlantGroup,
  grassGroup,
  kalmiaBushGroup,
);
