const getOffsetByAngle = (length, angle) => {
  return [length * Math.cos(angle), length * Math.sin(angle)];
};
export { getOffsetByAngle };
