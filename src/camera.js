import * as THREE from "three";
import {
  RIGHT_MOUSE_BUTTON,
  LEFT_MOUSE_BUTTON,
  MIDDLE_MOUSE_BUTTON,
  MAX_CAMERA_RADIUS,
  MIN_CAMERA_RADIUS,
  DEG2RAD,
  PAN_SENSITIVITY,
  ZOOM_SENSITIVITY,
  ROTATION_SENSITIVITY,
  MAX_CAMERA_ELEVATION,
  MIN_CAMERA_ELEVATION,
} from "./constants.js";

export const createCamera = (gameWindow) => {
  const camera = new THREE.PerspectiveCamera(
    75,
    gameWindow.offsetWidth / gameWindow.offsetHeight,
    0.1,
    1000
  );
  let cameraOrigin = new THREE.Vector3(0, 0, 0);
  let cameraRadius = 4;
  let cameraAzimuth = 0;
  let cameraElevation = 0;
  let isLeftMouseDown = false;
  let isRightMouseDown = false;
  let isMiddleMouseDown = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  const Y_AXIS = new THREE.Vector3(0, 1, 0);

  updateCameraPosition();

  function onMouseDown(e) {
    if (e.button === RIGHT_MOUSE_BUTTON) {
      isRightMouseDown = true;
    }
    if (e.button === LEFT_MOUSE_BUTTON) {
      isLeftMouseDown = true;
    }
    if (e.button === MIDDLE_MOUSE_BUTTON) {
      isMiddleMouseDown = true;
    }
  }

  function onMouseUp(e) {
    if (e.button === RIGHT_MOUSE_BUTTON) {
      isRightMouseDown = false;
    }
    if (e.button === LEFT_MOUSE_BUTTON) {
      isLeftMouseDown = false;
    }
    if (e.button === MIDDLE_MOUSE_BUTTON) {
      isMiddleMouseDown = false;
    }
  }

  function onMouseMove(e) {
    const deltaX = e.clientX - prevMouseX;
    const deltaY = e.clientY - prevMouseY;

    // Handles the rotation of the camera
    if (isLeftMouseDown) {
      cameraAzimuth += -(deltaX * ROTATION_SENSITIVITY);
      cameraElevation += deltaY * ROTATION_SENSITIVITY;
      cameraElevation = Math.min(
        MAX_CAMERA_ELEVATION,
        Math.max(MIN_CAMERA_ELEVATION, cameraElevation)
      );
      updateCameraPosition();
    }

    // Handles the panning of the camera
    if (isMiddleMouseDown) {
      const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(
        Y_AXIS,
        cameraAzimuth * DEG2RAD
      );
      const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(
        Y_AXIS,
        cameraAzimuth * DEG2RAD
      );

      cameraOrigin.add(forward.multiplyScalar(PAN_SENSITIVITY * deltaY));
      cameraOrigin.add(left.multiplyScalar(PAN_SENSITIVITY * deltaX));
      updateCameraPosition();
    }

    // Handles the zoom of the camera
    if (isRightMouseDown) {
      cameraRadius += deltaY * ZOOM_SENSITIVITY;
      cameraRadius = Math.min(
        MAX_CAMERA_RADIUS,
        Math.max(MIN_CAMERA_RADIUS, cameraRadius)
      );
      updateCameraPosition();
    }

    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  }

  function updateCameraPosition() {
    camera.position.x =
      cameraRadius *
      Math.sin(cameraAzimuth * DEG2RAD) *
      Math.cos(cameraElevation * DEG2RAD);
    camera.position.y = cameraRadius * Math.sin(cameraElevation * DEG2RAD);
    camera.position.z =
      cameraRadius *
      Math.cos(cameraAzimuth * DEG2RAD) *
      Math.cos(cameraElevation * DEG2RAD);
    camera.position.add(cameraOrigin);
    camera.lookAt(cameraOrigin);
    camera.updateMatrix();
  }

  return {
    camera,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
};
