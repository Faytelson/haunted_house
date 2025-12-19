import * as THREE from "three";
import Ground from "@world/ground";
import Forest from "@world/forest/";
import House from "./housePlot/house/";

class World {
  constructor(app) {
    this.scene = app.scene;
    this.assets = app.assetLoader.assets;
    this.addGround();
    this.addHouse();
    // this.addForest();
    // когда весь мир будет готов, эмитим событие готовности, а в app реализуем действие по этому эмиту
  }

  addGround() {
    const ground = new Ground(this.assets.textures.grassTexture).getMesh();
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  addHouse() {
    const house = new House(this.assets).getObject();
    this.scene.add(house);
  }

  addForest() {
    const forest = new Forest(this.assets.models.forestTrees).getObject();
    this.scene.add(forest);
  }
}

export default World;
