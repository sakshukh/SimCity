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

  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xfff000 });
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  scene.add(boxMesh);

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
    start,
    stop,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
};
