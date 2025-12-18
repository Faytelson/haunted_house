for (const key in houseRoadTexture) {
  houseRoadTexture[key].repeat.x = 1;
  houseRoadTexture[key].repeat.y = 20;
  houseRoadTexture[key].wrapS = THREE.RepeatWrapping;
  houseRoadTexture[key].wrapT = THREE.RepeatWrapping;
}
houseRoadTexture.color.colorSpace = THREE.SRGBColorSpace;
