import * as THREE from "three";
import { ground } from "./ground";
import { house } from "./house";
import { fence } from "./fence";
import { treesGroup, instancedPlants, tree, instancedWheat } from "./plants";

export const fullScene = new THREE.Group();
fullScene.add(ground, house, fence, treesGroup, instancedPlants, tree, instancedWheat);