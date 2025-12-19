import * as THREE from "three";
import Walls from "@house/walls";
import Door from "@house/door";
import Gable from "./gable";
import { METRICS } from "@world/metrics";

class House {
  constructor(assets) {
    this.assets = assets;
    this.group = new THREE.Group();
    this.addWalls();
    this.addDoor();
    this.addGables();
  }

  addWalls() {
    const walls = new Walls(this.assets.textures.houseWallsTexture).getMesh();
    walls.position.y = METRICS.house.firstFloorHeight / 2;
    this.group.add(walls);
  }

  addDoor() {
    const door = new Door(this.assets.textures.doorTexture).getMesh();
    door.position.y = METRICS.door.height / 2 + 0.3;
    door.position.z = METRICS.house.length / 2 + 0.01;
    this.group.add(door);
  }

  addGables() {
    const gable = new Gable(this.assets.textures.houseWallsTexture, {
      widthHalf: METRICS.house.width / 2,
      height: METRICS.house.secondFloorHeight,
    }).getMesh();
    gable.position.y = METRICS.house.firstFloorHeight;
    gable.position.z = -METRICS.house.length / 2;
    this.group.add(gable);

    const gableWindow = new Gable(this.assets.textures.houseWallsTexture, {
      widthHalf: METRICS.house.width / 2,
      height: METRICS.house.secondFloorHeight,
      window: {
        x: 0,
        y: 1 + METRICS.house.gableWindowRadius,
        radius: METRICS.house.gableWindowRadius,
      },
    }).getMesh();
    gableWindow.position.y = METRICS.house.firstFloorHeight;
    gableWindow.position.z = METRICS.house.length / 2;
    this.group.add(gableWindow);
  }

  getObject() {
    return this.group;
  }
}

export default House;
