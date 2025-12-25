// gates
// const gatesHeight = fenceHeight - 0.5;
// const gatesGeometry = new THREE.BoxGeometry(gatesWidth / 2, gatesHeight, fenceThickness); 


// const gatesLeft = new THREE.Mesh(gatesGeometry, fenceMaterial);
// const gatesLeftAngle = -Math.PI / 8;
// gatesLeft.position.set(
//   -gatesWidth / 2 + Math.cos(gatesLeftAngle) * (gatesWidth / 4),
//   gatesHeight / 2,
//   fenceWidth / 2 - fenceThickness - Math.sin(gatesLeftAngle) * (gatesWidth / 4),
// );
// gatesLeft.rotation.y = gatesLeftAngle;

// const gatesRight = new THREE.Mesh(gatesGeometry, fenceMaterial);
// const gatesRightAngle = Math.PI / 18;
// gatesRight.position.set(
//   gatesWidth / 2 - Math.cos(gatesRightAngle) * (gatesWidth / 4),
//   gatesHeight / 2,
//   fenceWidth / 2 - fenceThickness + Math.sin(gatesRightAngle) * (gatesWidth / 4),
// );
// gatesRight.rotation.y = gatesRightAngle;

// fence.add(fenceFrontLeft, fenceFrontRight, fenceBack, fenceLeft, fenceRight, gatesLeft, gatesRight);
// fence.traverse((child) => {
//   if (child.isMesh) {
//     child.castShadow = true;
//     child.receiveShadow = false;
//   }
// });
