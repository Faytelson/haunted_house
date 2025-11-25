import * as THREE from "three";
import { ground } from "./ground";
import { house } from "./house";
import { fence } from "./fence";
import {
  treesScene,
  forestTreesScene,
  plantsGroup,
  plantsGroup2,
  treeScene,
  wheatGroup,
  kalmiaBushGroup,
  ribbonGrassGroup,
} from "./plants";

export const fullScene = new THREE.Group();
fullScene.add(
  ground,
  house,
  fence,
  treesScene,
  forestTreesScene,
  plantsGroup,
  plantsGroup2,
  treeScene,
  wheatGroup,
  kalmiaBushGroup,
  ribbonGrassGroup,
);