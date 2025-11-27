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

export { getOffsetByAngle, cloneScene };