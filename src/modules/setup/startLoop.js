const startLoop = (camera, raycaster, renderer, scene) => {
  camera.lookAt(cameraTarget.x, cameraTarget.y, cameraTarget.z);

  // raycaster.setFromCamera(input.mouse, camera);
  // const houseIntersects = raycaster.intersectObjects(houseObjectsToIntersect);
  portfolioLabel.classList.toggle("label_visible", houseIntersects.length > 0);
  // const barnIntersects = raycaster.intersectObjects(barnObjectsToIntersect);
  foodLabel.classList.toggle("label_visible", barnIntersects.length > 0);
  // const treesIntersects = raycaster.intersectObjects(treesObjectsToIntersect);
  objectsLabel.classList.toggle("label_visible", treesIntersects.length > 0);

  if (input.pointerDown) {
    if (houseIntersects.length) {
      window.open("https://hh.ru/resume/42e2d626ff0937187c0039ed1f7a587437656e", "_blank");
    }
    if (barnIntersects.length) {
      window.open("https://food-red-six.vercel.app/", "_blank");
    }
    if (treesIntersects.length) {
      window.open("https://hh.ru/resume/42e2d626ff0937187c0039ed1f7a587437656e", "_blank");
    }

    input.pointerDown = false;
  }

  updateLabelPosition(tooltipHouse, portfolioLabel, camera, sizes);
  updateLabelPosition(tooltipBarn, foodLabel, camera, sizes);
  updateLabelPosition(tooltipTree, objectsLabel, camera, sizes);

  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

export { startLoop };
