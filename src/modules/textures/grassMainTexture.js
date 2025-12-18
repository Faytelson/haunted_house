for (const key in grassMainTexture) {
  grassMainTexture[key].repeat.x = 40;
  grassMainTexture[key].repeat.y = 40;
  grassMainTexture[key].wrapS = THREE.RepeatWrapping;
  grassMainTexture[key].wrapT = THREE.RepeatWrapping;
}
grassMainTexture.color.colorSpace = THREE.SRGBColorSpace;
