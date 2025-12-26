import * as THREE from "three";
import SceneAssembler from "@world/SceneAssembler";

class BackYardPlants extends SceneAssembler {
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
        countInRow: 9,
        countInColumn: 4,
        stepInRow: 4,
        stepInColumn: 2,
        rangeInRow: 2,
        rangeInColumn: 1.5,
        scale: 1,
        rotation: new THREE.Euler(-Math.PI / 2, 0, 0),
      },
      this.clonedMeshes,
    );
    const plants = this.buildGroup(instanced);
    this.group.add(plants);
  }
}

export default BackYardPlants;
