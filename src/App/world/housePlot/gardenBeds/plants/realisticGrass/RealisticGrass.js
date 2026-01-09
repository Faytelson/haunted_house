import * as THREE from "three";
import SceneAssembler from "@world/SceneAssembler";

class RealisticGrass extends SceneAssembler {
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
        countInColumn: 5,
        stepInRow: 3.1,
        stepInColumn: 1.8,
        rangeInRow: 0.6,
        rangeInColumn: 0.4,
        scale: 3,
      },
      this.clonedMeshes,
      false
    );
    const plants = this.buildGroup(instanced);
    this.group.add(plants);
  }
}

export default RealisticGrass;
