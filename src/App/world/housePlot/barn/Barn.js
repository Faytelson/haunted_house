import * as THREE from "three";
import Roof from "@world/housePlot/roof";
import Door from "@world/housePlot/door";
import Walls from "@world/housePlot/walls";
import { METRICS } from "@world/metrics";

class Barn {
  constructor(assets) {
    this.assets = assets;
    this.group = new THREE.Group();
    this.createRoof();
    this.createDoor();
    this.createWalls();
  }

  createRoof() {
    const roof = new Roof(this.assets.textures.roofTexture, "plane").getObject();
    roof.position.y = METRICS.barn.height;
    this.group.add(roof);
  }

  createDoor() {
    const door = new Door(this.assets.textures.doorTexture).getMesh();
    door.position.y = METRICS.door.height / 2 + 0.1;
    door.position.z = METRICS.barn.length / 2 + 0.01;
    this.group.add(door);
  }

  createWalls() {
    const metrics = {
      width: METRICS.barn.width,
      firstFloorHeight: METRICS.barn.height,
      length: METRICS.barn.length,
    };
    const walls = new Walls(this.assets.textures.houseWallsTexture, metrics).getMesh();
    walls.position.y = METRICS.barn.height / 2;
    this.group.add(walls);
  }

  getObject() {
    return this.group;
  }
}

export default Barn;
