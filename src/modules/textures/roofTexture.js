for (const key in roofTexture) {
  roofTexture[key].repeat.x = 4;
  roofTexture[key].repeat.y = 2;
  roofTexture[key].wrapS = THREE.RepeatWrapping;
  roofTexture[key].wrapT = THREE.RepeatWrapping;
}
roofTexture.color.colorSpace = THREE.SRGBColorSpace;
