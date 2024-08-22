import * as THREE from "three";
import { createCamera } from "./camera.js";

console.log(THREE);

export const createScene = () => {
  const gameWindow = document.getElementById("render-target");

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x777777);

  const camera = createCamera(gameWindow);
  //   scene.add(camera);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
  gameWindow.appendChild(renderer.domElement);

  let terrain = [];
  let buildings = [];

  function cityIntialization(city) {
    scene.clear();
    terrain = [];
    buildings = [];
    for (let x = 0; x < city.size; x++) {
      let column = [];
      for (let y = 0; y < city.size; y++) {
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
        const boxMaterial = new THREE.MeshLambertMaterial({ color: 0xfff000 });
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        boxMesh.position.set(x, -0.5, y);
        scene.add(boxMesh);
        column.push(boxMesh);
      }
      terrain.push(column);
      buildings.push([...Array(city.size)]);
      console.log(buildings);
    }

    setUpLights();
  }

  function update(city) {
    for (let x = 0; x < city.size; x++) {
      for (let y = 0; y < city.size; y++) {
        const tile = city.data[x][y];
        if (tile.building && tile.building.startsWith("building")) {
          const height = Number(tile.building.slice(-1));
          const buildingGeometry = new THREE.BoxGeometry(1, height, 1);
          const buildingMaterial = new THREE.MeshLambertMaterial({
            color: 0xff0000,
          });
          const buildingMesh = new THREE.Mesh(
            buildingGeometry,
            buildingMaterial
          );
          buildingMesh.position.set(x, height / 2, y);
          console.log(buildings[x][y]);
          if (buildings[x][y]) {
            scene.remove(buildings[x][y]);
          }

          scene.add(buildingMesh);
          buildings[x][y] = buildingMesh;
        }
      }
    }
  }

  function setUpLights() {
    const lights = [
      new THREE.AmbientLight(0xffffff, 0.2),
      new THREE.DirectionalLight(0xffffff, 0.3),
      new THREE.DirectionalLight(0xffffff, 0.3),
      new THREE.DirectionalLight(0xffffff, 0.3),
    ];

    lights[1].position.set(0, 1, 0);
    lights[2].position.set(1, 1, 0);
    lights[3].position.set(0, 1, 1);

    scene.add(...lights);
  }

  function draw() {
    renderer.render(scene, camera.camera);
  }

  function start() {
    renderer.setAnimationLoop(draw);
  }

  function stop() {
    renderer.setAnimationLoop(null);
  }

  function onMouseDown(e) {
    camera.onMouseDown(e);
  }

  function onMouseUp(e) {
    camera.onMouseUp(e);
  }

  function onMouseMove(e) {
    camera.onMouseMove(e);
  }

  return {
    cityIntialization,
    start,
    stop,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    update,
  };
};
