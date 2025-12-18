const wrapX = 5;
for (const key in fenceTexture) {
  fenceTexture[key].repeat.x = wrapX;
  fenceTexture[key].wrapS = THREE.RepeatWrapping;
  fenceTexture[key].wrapT = THREE.ClampToEdgeWrapping;
}
fenceTexture.color.colorSpace = THREE.SRGBColorSpace;
