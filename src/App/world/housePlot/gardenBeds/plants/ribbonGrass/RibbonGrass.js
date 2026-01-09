import * as THREE from "three";
import SceneAssembler from "@world/SceneAssembler";

class RibbonGrass extends SceneAssembler {
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
        countInRow: 3,
        countInColumn: 3,
        stepInRow: 4.4,
        stepInColumn: 3,
        rangeInRow: 1.2,
        rangeInColumn: 0.5,
        scale: 0.06,
        rotation: new THREE.Euler(Math.PI / 2, 0, 0),
      },
      this.clonedMeshes,
      false,
    );
    const plants = this.buildGroup(instanced);
    this.group.add(plants);
  }
}

export default RibbonGrass;
