import * as THREE from "three";

function updateLabelPosition(object, labelEl, camera, sizes) {
  const vector = new THREE.Vector3();
  vector.copy(object.position);
  vector.project(camera);

  const x = ((vector.x + 1) / 2) * sizes.width;
  const y = ((vector.y + 1) / 2) * sizes.height;

  labelEl.style.transform = `translate(${x}px, ${y}px)`;
}
export { updateLabelPosition };
