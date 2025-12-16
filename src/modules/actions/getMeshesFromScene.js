const getMeshesFromScene = (scene) => {
  const meshes = [];
  scene.traverse((child) => {
    if (child.isMesh) meshes.push(child);
  });
  return meshes;
};

export { getMeshesFromScene };
