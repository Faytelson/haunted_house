import * as THREE from "three";

class SceneAssembler {
  constructor(modelRoot) {
    this.group = new THREE.Group();
    this.modelScene = modelRoot.scene;
  }

  getMeshesFromScene() {
    const meshes = [];
    this.modelScene.traverse((child) => {
      if (child.isMesh) meshes.push(child);
    });
    this.meshes = meshes;
  }

  getFilteredMeshes(meshes, cb) {
    return meshes.filter(cb);
  }

  createInstancedMeshes(options, meshes) {
    const {
      countInRow,
      countInColumn,
      stepInRow,
      stepInColumn,
      rangeInRow,
      rangeInColumn,
      scale,
      rotation,
    } = options;
    const total = countInRow * countInColumn;
    const instancedMeshes = [];

    meshes.forEach((mesh) => {
      const instancedMesh = new THREE.InstancedMesh(mesh.geometry, mesh.material, total);
      instancedMeshes.push(instancedMesh);
    });

    const positions = [];

    for (let x = 0; x < countInRow; x++) {
      for (let z = 0; z < countInColumn; z++) {
        const offsetX = (Math.random() - 0.5) * rangeInRow;
        const offsetZ = (Math.random() - 0.5) * rangeInColumn;

        positions.push(new THREE.Vector3(x * stepInRow + offsetX, 0, z * stepInColumn + offsetZ));
      }
    }

    const dummy = new THREE.Object3D();
    instancedMeshes.forEach((instancedMesh) => {
      if (scale) dummy.scale.set(scale, scale, scale);
      if (rotation && rotation.isEuler) dummy.rotation.copy(rotation);

      positions.forEach((pos, i) => {
        dummy.position.copy(pos);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      });

      instancedMesh.castShadow = true;
      instancedMesh.receiveShadow = true;
      instancedMesh.instanceMatrix.needsUpdate = true;
    });

    return instancedMeshes;
  }

  setBox() {
    this.box = new THREE.Box3().setFromObject(this.group);
  }

  buildGroup(meshes) {
    const group = new THREE.Group();
    meshes.forEach((mesh) => group.add(mesh));
    return group;
  }

  enableShadows(group) {
    group.traverse((child) => {
      if (child.isMesh) child.castShadow = true;
    });
  }

  getObject() {
    return this.group;
  }
}

export default SceneAssembler;
