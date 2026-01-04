import Ground from "@world/ground";
import Forest from "@world/forest/";
import HousePlot from "@world/housePlot";
import { METRICS } from "@world/metrics";

class World {
  constructor(app) {
    this.scene = app.scene;
    this.assets = app.assetLoader.assets;
    this.createGround();
    this.createForest();
    this.createHousePlot();
  }

  createGround() {
    const ground = new Ground(this.assets.textures.grassTexture).getMesh();
    ground.rotation.x = -Math.PI / 2;
    this.scene.add(ground);
  }

  createForest() {
    const forest = new Forest(this.assets.models.forestTrees).getObject();
    forest.position.x = -52;
    this.scene.add(forest);
  }

  createHousePlot() {
    const housePlot = new HousePlot(this.assets).getObject();
    this.scene.add(housePlot);
    housePlot.position.z = METRICS.housePlot.offsetZ;
  }
}

export default World;
