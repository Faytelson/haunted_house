const options = {
  color: 0xffc27a,
  intensity: 2.8,
  position: {
    x: 20,
    y: 20,
    z: 30,
  },
  castShadow: true,
  shadow: {
    mapSize: {
      x: 1024,
      y: 1024,
    },
    camera: {
      near: 0.5,
      far: 70,
      left: -50,
      right: 50,
      top: 50,
      bottom: -50,
    },
    bias: 0.05,
  },
};

export default options;
