const options = {
  color: 0xffb366,
  intensity: 3.2,
  position: {
    x: 60,
    y: 35,
    z: 120,
  },
  castShadow: true,
  shadow: {
    mapSize: {
      x: 1024,
      y: 1024,
    },
    camera: {
      near: 1,
      far: 150,
      left: -80,
      right: 80,
      top: 80,
      bottom: -80,
    },
    bias: -0.0005,
  },
};

export default options;
