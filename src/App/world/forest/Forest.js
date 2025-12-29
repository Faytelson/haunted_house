import * as THREE from "three";
import SceneAssembler from "@world/SceneAssembler";
import { METRICS } from "@world/metrics";

class Forest extends SceneAssembler {
  constructor(modelRoot) {
    super(modelRoot);
    this.modelScene = modelRoot.scene;
    this.getMeshesFromScene();
    this.setFilteredMeshes();
    this.createMainForest();
    this.createSideForest();
    this.setBox();
    this.setGroup();
    this.enableShadows();
  }

  setFilteredMeshes() {
    this.filteredMeshes = this.getFilteredMeshes(
      this.meshes,
      (mesh) =>
        mesh.name !== "SM_FreeTree_07_Free_Tree_M_0" &&
        mesh.name !== "SM_FreeTree_04_Free_Tree_M_0",
    );
  }

  createMainForest() {
    const instanced = this.createInstancedMeshes(
      {
        countInRow: 26,
        countInColumn: 6,
        stepInRow: 10,
        stepInColumn: 15,
        rangeInRow: 5,
        rangeInColumn: 6,
        scale: 0.02,
      },
      this.filteredMeshes,
    );

    const mainForest = this.buildGroup(instanced);
    this.group.add(mainForest);
  }

  createSideForest() {
    const instanced = this.createInstancedMeshes(
      {
        countInRow: 15,
        countInColumn: 4,
        stepInRow: 6,
        stepInColumn: 7,
        rangeInRow: 2,
        rangeInColumn: 5,
        scale: 0.015,
        rotation: new THREE.Euler(0, Math.PI / 2, 0),
      },
      this.filteredMeshes,
    );

    const leftForest = this.buildGroup(instanced);
    leftForest.position.x = 0;
    leftForest.position.z = 80;
    this.group.add(leftForest);

    const rightForest = leftForest.clone();
    leftForest.position.x = 150;
    leftForest.position.z = 80;
    this.group.add(rightForest);
  }

  setGroup() {
    this.group.position.x = -this.box.min.x - METRICS.ground.width / 2;
    this.group.position.z = -this.box.min.z - METRICS.ground.height / 2;
  }
}

export default Forest;
