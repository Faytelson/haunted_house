import * as THREE from "three";
import { plane } from "./planeMesh";
import { houseGroup } from "./houseGroup";

export const fullScene = new THREE.Group();
fullScene.add(plane, houseGroup);
