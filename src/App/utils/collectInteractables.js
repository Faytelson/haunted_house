const collectInteractables = (scene) => {
  const objects = [];

  scene.traverse((child) => {
    if (child.userData.isInteractable) {
      objects.push(child);
    }
  });

  return objects;
};

export default collectInteractables;
