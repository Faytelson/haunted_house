const getCanvasRect = (canvas) => {
  let canvasRect = canvas.getBoundingClientRect();
  return canvasRect;
};

export default getCanvasRect;
