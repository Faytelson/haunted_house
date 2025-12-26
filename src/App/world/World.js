import * as THREE from "three";
import Ground from "@world/ground";
import Forest from "@world/forest/";
import House from "@world/housePlot/house/";
import Barn from "@world/housePlot/barn";
import Fence from "@world/housePlot/fence";
import BackYardGround from "@world/housePlot/backYardGround";
import HouseRoad from "@world/housePlot/houseRoad";
import HouseTrees from "@world/housePlot/houseTrees";
import BackYardPlants from "@world/housePlot/backYardPlants";
import FrontYardPlants from "@world/housePlot/FrontYardPlants";
import { METRICS } from "@world/metrics";

class World {
  constructor(app) {
    this.scene = app.scene;
    this.assets = app.assetLoader.assets;
    this.createGround();
    this.createHouse();
    this.createBarn();
    this.createFence();
    this.createBackYardGround();
    this.createHouseRoad();
    this.createHouseTrees();
    this.createBackYardPlants();
    this.createFrontYardPlants();
    // this.createForest();
    // когда весь мир будет готов, эмитим событие готовности, а в app реализуем действие по этому эмиту
  }

  createGround() {
    const ground = new Ground(this.assets.textures.grassTexture).getMesh();
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  createHouse() {
    const house = new House(this.assets).getObject();
    this.scene.add(house);
  }

  createBarn() {
    const barn = new Barn(this.assets).getObject();
    barn.position.x = METRICS.fence.width / 2 - METRICS.barn.width / 2 - 2;
    barn.position.z = -(METRICS.fence.width / 2 - METRICS.barn.width / 2) + 2;
    this.scene.add(barn);
  }

  createFence() {
    const fence = new Fence(this.assets.textures.fenceTexture).getObject();
    this.scene.add(fence);
  }

  createBackYardGround() {
    const backYardGroundClass = new BackYardGround(this.assets.textures.grassTexture);
    const backYardGround = backYardGroundClass.getMesh();
    backYardGround.rotation.x = -Math.PI / 2;
    const length = backYardGroundClass.getLength();
    backYardGround.position.z = length / 2 - METRICS.fence.width / 2 + 0.1;
    backYardGround.position.y = 0.001;
    this.scene.add(backYardGround);
  }

  createHouseRoad() {
    const houseRoad = new HouseRoad(this.assets.textures.houseRoadTexture).getMesh();
    houseRoad.rotation.x = -Math.PI / 2;
    houseRoad.position.y = 0.001;
    houseRoad.position.z = METRICS.fence.width / 2 - METRICS.houseRoad.length / 2 - 0.1;
    this.scene.add(houseRoad);
  }

  createHouseTrees() {
    const houseTrees = new HouseTrees(this.assets.models.forestTrees).getObject();
    this.scene.add(houseTrees);
  }

  createBackYardPlants() {
    const backYardPlants = new BackYardPlants(this.assets.models.berryPlants).getObject();
    backYardPlants.position.x = -METRICS.fence.width / 2 + 1.3;
    backYardPlants.position.z = -METRICS.fence.width / 2 + 3.5;
    this.scene.add(backYardPlants);
  }

  createFrontYardPlants() {
    const frontYardPlants = new FrontYardPlants(this.assets.models.berryPlants).getObject();
    frontYardPlants.position.x = -2.3;
    frontYardPlants.position.z = 6.5;
    this.scene.add(frontYardPlants);
  }

  createForest() {
    const forest = new Forest(this.assets.models.forestTrees).getObject();
    this.scene.add(forest);
  }
}

export default World;
