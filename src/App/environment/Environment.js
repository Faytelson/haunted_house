import * as THREE from "three";

class Environment {
  constructor(app, { ambientLightOptions, sunLightOptions, envMapOptions }) {
    this.scene = app.scene;
    this.ambientLightOptions = ambientLightOptions;
    this.sunLightOptions = sunLightOptions;
    this.envMapOptions = envMapOptions;
    this.assetLoader = app.assetLoader;
    this.setEnvironmentMap();
    this.setAmbientLight();
    this.setSunLight();
  }

  setAmbientLight() {
    const { color, intensity } = this.ambientLightOptions;

    this.ambientLight = new THREE.AmbientLight(color, intensity);
    this.scene.add(this.ambientLight);
  }

  setSunLight() {
    const {
      color,
      intensity,
      position: { x, y, z },
      castShadow,
      shadow: { mapSize, camera, bias },
    } = this.sunLightOptions;

    this.sunLight = new THREE.DirectionalLight(color, intensity);
    this.sunLight.position.set(x, y, z);
    this.sunLight.castShadow = castShadow;
    this.sunLight.shadow.mapSize.set(mapSize.x, mapSize.y);
    Object.assign(this.sunLight.shadow.camera, camera);
    this.sunLight.shadow.bias = bias;
    this.scene.add(this.sunLight);
  }

  setEnvironmentMap() {
    const envMap = this.assetLoader.assets.environment.envMap;
    envMap.encoding = THREE.sRGBEncoding;
    this.scene.environment = envMap;
    this.scene.background = envMap;
  }

  updateMaterials() {
    const { intensity } = this.envMapOptions;

    this.scene.traverse((child) => {
      if (
        child.isMesh &&
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        child.material.envMapIntensity = intensity;
        child.material.needsUpdate = true;
      }
    });
  }
}

export default Environment;
