export const METRICS = {
  ground: {
    width: 200,
    height: 150,
  },
  house: {
    width: 7,
    length: 10,
    firstFloorHeight: 3.5,
    secondFloorHeight: 3,
    gableWindowRadius: 0.4,
  },
  door: {
    // Изначальная ширина двери 1.4, умноженная на коэффициент
    // чтобы текстура легла на нужную ширину
    width: 1.4 * 1.5,
    height: 2,
  },
  roof: {
    slopeOffset: 0.6,
    offsetByLength: 1,
    depth: 0.1,
  },
  porch: {
    length: 2,
    stepHeight: 0.17,
    stepDiff: 0.25,
    spaceAbovePorch: 0.5,
    thresholdSideSpace: 0.5,
    roofThickness: 0.05,
    roofLength: 2.4,
    pillarRadius: 0.1,
  },
  barn: {
    width: 4,
    height: 3.5,
    length: 5,
    roofOffsetX: 0.8,
    roofOffsetZ: 0.6,
  },
  fence: {
    width: 35,
    height: 2,
    thickness: 0.05,
    gatesWidth: 3,
  },
  backYard: {
    offset: 0.2,
  },
  houseRoad: {
    length: 10.2,
    offset: 2,
  },
  beds: {
    spaceBetween: 1,
  },
  housePlot: {
    offsetZ: 35,
  },
};
