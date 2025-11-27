import { loadScene } from "../../createInstancedMesh";
import { fenceWidth } from "./fence";

const firePitScene = await loadScene("models/fire_pit/scene.gltf");
firePitScene.position.set(4, 0.3, -fenceWidth / 4 - 4);
firePitScene.scale.set(1, 1, 1);

export { firePitScene };
