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
        countInRow: 8,
        countInColumn: 9,
        stepInRow: 1.6,
        stepInColumn: 1,
        rangeInRow: 0.6,
        rangeInColumn: 0.4,
        scale: 0.02,
        rotation: new THREE.Euler(Math.PI / 2, 0, 0),
      },
      this.clonedMeshes,
    );
    const plants = this.buildGroup(instanced);
    this.group.add(plants);
  }
}

export default RibbonGrass;
