import { tooltipAnchorBarn } from "../tooltips";
// tooltip barn
barn.add(tooltipAnchorBarn);
tooltipAnchorBarn.position.set(6, barnHeight + 1, barnLength / 2);

// tooltip house
house.add(tooltipAnchorHouse);
tooltipAnchorHouse.position.set(0, firstFloorHeight + secondFloorHeight + 1, houseLength / 2);

// tooltip tree
treeGroup.add(tooltipAnchorTree);
tooltipAnchorTree.position.set(-15, 12, 0);
