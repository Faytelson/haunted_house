import * as THREE from "three";
import Walls from "@world/housePlot/walls";
import Gable from "@world/housePlot/gable";
import Door from "@world/housePlot/door";
import Roof from "@world/housePlot/roof";
import Porch from "@world/housePlot/porch";
import { METRICS } from "@world/metrics";

class House {
  constructor(assets) {
    this.assets = assets;
    this.group = new THREE.Group();
    this.createWalls();
    this.createDoor();
    this.createGables();
    this.createRoof();
    this.createPorch();
    this.setAnchor();
    this.setId();
    this.enableShadows();
  }

  createWalls() {
    const metrics = {
      width: METRICS.house.width,
      firstFloorHeight: METRICS.house.firstFloorHeight,
      length: METRICS.house.length,
    };
    const walls = new Walls(this.assets.textures.houseWallsTexture, metrics).getMesh();
    walls.position.y = METRICS.house.firstFloorHeight / 2;
    this.group.add(walls);
  }

  createDoor() {
    const door = new Door(this.assets.textures.doorTexture).getMesh();
    door.position.y = METRICS.door.height / 2 + 0.3;
    door.position.z = METRICS.house.length / 2 + 0.01;
    this.group.add(door);
  }

  createGables() {
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

  createRoof() {
    const roof = new Roof(this.assets.textures.roofTexture, "angle").getObject();
    roof.position.y = METRICS.house.firstFloorHeight;
    this.group.add(roof);
  }

  createPorch() {
    const porch = new Porch(
      this.assets.textures.houseWallsTexture,
      this.assets.textures.roofTexture,
    ).getObject();
    porch.position.y = METRICS.porch.stepHeight / 2;
    porch.position.z = METRICS.house.length / 2 + METRICS.porch.length / 2;
    this.group.add(porch);
  }

  setId() {
    this.group.userData.isInteractable = true;
    this.group.traverse((child) => {
      if (child.isMesh) {
        child.userData.tooltipID = "house";
        child.userData.anchor = this.anchor;
      }
    });
  }

  setAnchor() {
    this.anchor = new THREE.Object3D();
    this.anchor.position.set(
      0,
      METRICS.house.firstFloorHeight + METRICS.house.secondFloorHeight + 1,
      METRICS.house.length / 2,
    );
  }

  enableShadows() {
    this.group.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  getObject() {
    return this.group;
  }
}

export default House;
