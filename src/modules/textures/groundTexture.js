for (const key in groundTexture) {
  groundTexture[key].repeat.x = 3;
  groundTexture[key].repeat.y = 3;
  groundTexture[key].wrapS = THREE.RepeatWrapping;
  groundTexture[key].wrapT = THREE.RepeatWrapping;
}
groundTexture.color.colorSpace = THREE.SRGBColorSpace;
