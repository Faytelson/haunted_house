import * as THREE from "three";

const getOffsetByAngle = (length, angle) => {
  return [length * Math.cos(angle), length * Math.sin(angle)];
};

function cloneScene(scene) {
  const clone = scene.clone(true);
  clone.traverse((obj) => {
    if (obj.isMesh && obj.material) {
      obj.material = obj.material.clone();
    }
  });
  return clone;
}

function traverseAndCollectMeshes(object) {
  const meshes = [];
  object.traverse((child) => {
    if (child.isMesh) {
      meshes.push(child);
    }
  });
  return meshes;
}

function updateLabelPosition(object, labelEl, camera, sizes) {
  const vector = new THREE.Vector3();
  vector.copy(object.position);
  vector.project(camera);

  const x = ((vector.x + 1) / 2) * sizes.width;
  const y = ((vector.y + 1) / 2) * sizes.height;

  labelEl.style.transform = `translate(${x}px, ${y}px)`;
}

export { getOffsetByAngle, cloneScene, traverseAndCollectMeshes, updateLabelPosition };
