import { updateMousePosition, pointerDownOn, pointerDownOff } from "@actions/mouseEvents";
import { onWindowResize } from "@actions/resize";
import { setFullScreen } from "@actions/fullScreen";

const addListeners = (mouse, canvasRect, canvas) => {
  window.addEventListener("mousemove", (e) => {
    updateMousePosition(e, mouse, canvasRect);
  });
  window.addEventListener("pointerdown", () => {
    pointerDownOn(mouse);
  });

  window.addEventListener("pointerup", () => {
    pointerDownOff(mouse);
  });

  window.addEventListener("resize", onWindowResize);

  canvas.addEventListener("dblclick", (canvas) => {
    setFullScreen(canvas);
  });
};

export { addListeners };
