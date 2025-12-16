function updateMousePosition(event, mouse, canvasRect) {
  input.mouse.x = ((event.clientX - canvasRect.left) / canvasRect.width) * 2 - 1;
  input.mouse.y = -((event.clientY - canvasRect.top) / canvasRect.height) * 2 + 1;

  if (event.type === "pointerdown") {
  }

  if (event.type === "pointerup") {
    mouse.pointerDown = false;
  }
}

function pointerDownOn(mouse) {
  mouse.pointerDown = true;
}

function pointerDownOff(mouse) {
  mouse.pointerDown = false;
}

export { updateMousePosition, pointerDownOn, pointerDownOff };
