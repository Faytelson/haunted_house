import * as THREE from "three";
import Ground from "@world/ground";
import Forest from "@world/forest/";
import House from "@world/housePlot/house/";
import Barn from "@world/housePlot/barn";
import Fence from "@world/housePlot/fence";
import { METRICS } from "@world/metrics";

class World {
  constructor(app) {
    this.scene = app.scene;
    this.assets = app.assetLoader.assets;
    this.createGround();
    this.createHouse();
    this.createBarn();
    this.createFence();
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

  createForest() {
    const forest = new Forest(this.assets.models.forestTrees).getObject();
    this.scene.add(forest);
  }
}

export default World;
