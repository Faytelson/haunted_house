for (const key in houseWallsTexture) {
  houseWallsTexture[key].repeat.x = 2.5;
  houseWallsTexture[key].wrapS = THREE.RepeatWrapping;
  houseWallsTexture[key].wrapT = THREE.ClampToEdgeWrapping;
  houseWallsTexture[key].offset.x = 0.32;
}
houseWallsTexture.color.colorSpace = THREE.SRGBColorSpace;
