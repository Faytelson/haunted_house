import * as THREE from "three";
import { baseGround } from "./ground";
import { housePlot } from "./housePlot/housePlot";
import { forest } from "./forest";

export const fullScene = new THREE.Group();
fullScene.add(baseGround, housePlot, forest);
