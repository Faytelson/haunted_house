import * as THREE from "three";

const createInstancedMeshes = (options, meshes) => {
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
};

export { createInstancedMeshes };
