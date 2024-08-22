import { createCity } from "./city.js";
import { createScene } from "./scene.js";

export function createGame() {
  const scene = createScene();

  window.scene = scene;
  const city = createCity(12);
  scene.cityIntialization(city);
  window.scene.start();

  window.addEventListener("mousemove", window.scene.onMouseMove, false);
  window.addEventListener("mousedown", window.scene.onMouseDown, false);
  window.addEventListener("mouseup", window.scene.onMouseUp, false);

  const game = {
    update() {
      city.update();
      scene.update(city);
    },
  };

  setInterval(() => {
    game.update();
  }, 1000);
}
