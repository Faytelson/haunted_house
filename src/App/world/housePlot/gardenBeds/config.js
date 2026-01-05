import { METRICS } from "@world/metrics";

export default [
  {
    plantType: "bigLeaves",
    modelRoot: "bigLeaves",
    texture: "groundTexture",
    segmentsX: 200,
    segmentsY: 200,
    calculateMetrics() {
      const offsetX = 0.3;
      const offsetZ = 0.3;
      const plantsOffsetX = 1;
      const plantsOffsetZ = 1.5;
      const width = METRICS.fence.width / 2 - METRICS.house.width / 2 - plantsOffsetX - 0.2;
      const length = METRICS.fence.width / 2 + METRICS.house.width / 2;
      const x = -width / 2 + METRICS.fence.width / 2 - offsetX;
      const z = -length / 2 + METRICS.fence.width / 2 - offsetZ;

      return { width, length, plantsOffsetX, plantsOffsetZ, x, z };
    },
  },
  {
    plantType: "realisticGrass",
    modelRoot: "realisticGrass",
    texture: "groundTexture",
    segmentsX: 70,
    segmentsY: 70,
    calculateMetrics() {
      const offsetX = 0.4;
      const offsetZ = 1;
      const plantsOffsetX = 1;
      const plantsOffsetZ = 1.5;
      const width = METRICS.fence.width / 2 - METRICS.house.width / 2 - plantsOffsetX - 0.2;
      const length = width * 0.8;
      const x = width / 2 - METRICS.fence.width / 2 + offsetX;
      const z = -length / 2 + METRICS.fence.width / 2 - offsetZ;

      return { width, length, plantsOffsetX, plantsOffsetZ, x, z };
    },
  },
  {
    plantType: "ribbonGrass",
    modelRoot: "ribbonGrass",
    texture: "groundTexture",
    segmentsX: 70,
    segmentsY: 70,
    calculateMetrics() {
      const offsetX = 0.4;
      const offsetZ = 1;
      const plantsOffsetX = 1;
      const plantsOffsetZ = 1.5;
      const width = METRICS.fence.width / 2 - METRICS.house.width / 2 - plantsOffsetX - 0.2;
      const length = width * 0.8;
      const x = width / 2 - METRICS.fence.width / 2 + offsetX;
      const z = -length / 2 + METRICS.fence.width / 2 - offsetZ - length - METRICS.beds.spaceBetween;

      return { width, length, plantsOffsetX, plantsOffsetZ, x, z };
    },
  },
];
