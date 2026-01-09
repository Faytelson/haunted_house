import * as THREE from "three";
import SceneAssembler from "@world/SceneAssembler";

class FrontYardPlants extends SceneAssembler {
  constructor(modelRoot) {
    super(modelRoot);
    this.modelScene = modelRoot.scene;
    this.group = new THREE.Group();
    this.getMeshesFromScene();
    this.setClonedMeshes();
    this.createPlants();
  }

  createPlants() {
    const instanced = this.createInstancedMeshes(
      {
        countInRow: 2,
        countInColumn: 7,
        stepInRow: 4,
        stepInColumn: 1.5,
        rangeInRow: 0.4,
        rangeInColumn: 0.6,
        scale: 0.8,
        rotation: new THREE.Euler(-Math.PI / 2, 0, 0),
      },
      this.clonedMeshes,
      false,
    );
    const plants = this.buildGroup(instanced);
    this.group.add(plants);
  }
}

export default FrontYardPlants;
