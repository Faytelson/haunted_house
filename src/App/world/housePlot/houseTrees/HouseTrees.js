import * as THREE from "three";
import SceneAssembler from "@world/SceneAssembler";
import { METRICS } from "@world/metrics";

class HouseTrees extends SceneAssembler {
  constructor(modelRoot) {
    super(modelRoot);
    this.modelScene = modelRoot.scene;
    this.group = new THREE.Group();
    this.getMeshesFromScene();
    this.setClonedMeshes();
    this.createTrees();
  }

  createTrees() {
    this.clonedMeshes.forEach((mesh) => {
      if (mesh.name === "SM_FreeTree_02_Free_Tree_M_0") {
        mesh.position.x = 10;
        mesh.position.z = 6;
        mesh.scale.set(0.01, 0.01, 0.01);
        this.group.add(mesh);
      }

      if (mesh.name === "SM_FreeTree_05_Free_Tree_M_0") {
        mesh.position.x = 3;
        mesh.scale.set(0.015, 0.015, 0.015);
        this.group.add(mesh);
      }

      if (mesh.name === "SM_FreeTree_06_Free_Tree_M_0") {
        mesh.position.x = -4;
        mesh.position.z = 19;
        mesh.scale.set(0.012, 0.012, 0.012);
        mesh.userData.isInteractable = true;
        mesh.userData.tooltipID = "tree";
        const anchor = new THREE.Object3D();
        anchor.position.set(-17, 12, METRICS.housePlot.offsetZ + METRICS.house.length / 2);
        mesh.userData.anchor = anchor;
        this.group.add(mesh);
      }

      if (mesh.name === "SM_FreeTree_07_Free_Tree_M_0") {
        mesh.position.x = -1;
        mesh.position.z = 3;
        mesh.scale.set(0.01, 0.01, 0.01);
        this.group.add(mesh);
      }
    });

    this.group.position.x = -METRICS.fence.width / 2 + 1;
    this.group.position.z = -15;
    // this.group.traverse((child) => {
    //   if (child.isMesh) {
    //     child.castShadow = true;
    //     child.receiveShadow = true;
    //   }
    // });
  }
}

export default HouseTrees;
