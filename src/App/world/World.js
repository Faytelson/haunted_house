import * as THREE from "three";
import Ground from "@world/ground";
import Forest from "@world/forest/";

class World {
  constructor(app) {
    this.scene = app.scene;
    this.assets = app.assetLoader.assets;

    this.addMeshesToScene();
    // когда весь мир будет готов, эмитим событие готовности, а в app реализуем действие по этому эмиту
  }

  addMeshesToScene() {
    this.scene.add(new Ground(this.assets).getMesh());
    this.scene.add(new Forest(this.assets.models.forestTrees).getObject());
  }
}

export default World;
