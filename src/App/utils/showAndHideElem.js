export const showAndHideElem = (elem, delay, className) => {
  return new Promise((resolve) => {
    elem.classList.add(className);
    setTimeout(() => {
      elem.classList.remove(className);
      resolve();
    }, delay);
  });
};
