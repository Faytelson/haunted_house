import * as THREE from "three";
import GroupAssembler from "@world/GroupAssembler";
import Roof from "@world/housePlot/roof";
import Door from "@world/housePlot/door";
import Walls from "@world/housePlot/walls";
import { METRICS } from "@world/metrics";

class Barn extends GroupAssembler {
  constructor(assets) {
    super(assets);
    this.createRoof();
    this.createDoor();
    this.createWalls();
    this.setAnchor();
    this.setId();
    this.enableShadows();
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

  setId() {
    this.group.userData.isInteractable = true;
    this.group.userData.anchor = this.anchor;
    this.group.userData.tooltipID = "barn";
    this.group.traverse((child) => {
      if (child.isMesh) {
        child.userData.tooltipID = "barn";
        child.userData.anchor = this.anchor;
      }
    });
  }

  setAnchor() {
    this.anchor = new THREE.Object3D();
    this.anchor.position.set(
      6,
      METRICS.barn.height + 1,
      METRICS.barn.length / 2 + METRICS.housePlot.offsetZ - METRICS.fence.width / 2,
    );
  }
}

export default Barn;
