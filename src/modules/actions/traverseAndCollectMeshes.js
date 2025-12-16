function traverseAndCollectMeshes(object) {
  const meshes = [];
  object.traverse((child) => {
    if (child.isMesh) {
      meshes.push(child);
    }
  });
  return meshes;
}

export { traverseAndCollectMeshes };
