import Loader from "@somewhere/loader";
import { loadAssets, createWorld } from "@somewhere";

const InitApp = async () => {
  Loader.show();

    const assets = await loadAssets(); // Assume this is a function that loads necessary assets
    
    const world = createWorld(assets); // Assume this function creates and returns the 3D world
  Loader.hide();
};

export default InitApp;