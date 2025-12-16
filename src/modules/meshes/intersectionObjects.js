import { traverseAndCollectMeshes } from "./utils";
import { fullScene } from "./meshes/fullScene";

let houseGroup;
const houseObjectsToIntersect = [];

let barnGroup;
const barnObjectsToIntersect = [];

let treesGroup;
let treesObjectsToIntersect = [];

fullScene.children.forEach((child) => {
  if (child.userData.groupID === "housePlot") {
    child.children.forEach((subChild) => {
      if (subChild.userData.groupID === "house") {
        houseGroup = subChild;
      }
      if (subChild.userData.groupID === "barn") {
        barnGroup = subChild;
      }
      if (subChild.userData.groupID === "trees") {
        treesGroup = subChild;
      }
    });
  }
});
houseObjectsToIntersect.push(...traverseAndCollectMeshes(houseGroup));
barnObjectsToIntersect.push(...traverseAndCollectMeshes(barnGroup));
treesObjectsToIntersect.push(...traverseAndCollectMeshes(treesGroup));
treesObjectsToIntersect = treesObjectsToIntersect.filter(
  (mesh) => mesh.name === "SM_FreeTree_06_Free_Tree_M_0",
);

const portfolioLabel = document.querySelector(".label_portfolio");
const objectsLabel = document.querySelector(".label_objects");
const foodLabel = document.querySelector(".label_food");

export {
  houseObjectsToIntersect,
  barnObjectsToIntersect,
  treesObjectsToIntersect,
  portfolioLabel,
  objectsLabel,
  foodLabel,
};
