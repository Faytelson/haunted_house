import * as THREE from "three";
import SceneAssembler from "@world/SceneAssembler";

class BigLeaves extends SceneAssembler {
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
        countInRow: 4,
        countInColumn: 3,
        stepInRow: 3,
        stepInColumn: 6,
        rangeInRow: 0.6,
        rangeInColumn: 1.6,
        scale: 0.055,
        rotation: new THREE.Euler(Math.PI / 2, 0, 0),
      },
      this.clonedMeshes,
      false,
    );
    const plants = this.buildGroup(instanced);
    this.group.add(plants);
  }
}

export default BigLeaves;
