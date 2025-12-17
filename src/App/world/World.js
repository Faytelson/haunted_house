import * as THREE from "three";
import Environment from "@app/world/environment";
import config from "@app/world/environment/config";

class World {
  constructor(app) {
    this.scene = app.scene;

    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(10, 10, 10),
      new THREE.MeshStandardMaterial({ color: 0xa3c9fd }),
    );

    this.scene.add(testMesh);
    this.environment = new Environment(this, config);
  }
}

export default World;
