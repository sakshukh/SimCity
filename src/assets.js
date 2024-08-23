import * as THREE from "three";

const geometry = new THREE.BoxGeometry(1, 1, 1);

const createBuildingMesh = function (height, x, y, id) {
  const buildingMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000,
  });
  const buildingMesh = new THREE.Mesh(geometry, buildingMaterial);
  buildingMesh.position.set(x, height / 2, y);
  buildingMesh.scale.set(1, height, 1);
  buildingMesh.userData = { id: id };
  return buildingMesh;
};

const asset = {
  grass: (x, y) => {
    const boxMaterial = new THREE.MeshLambertMaterial({ color: 0xfff000 });
    const boxMesh = new THREE.Mesh(geometry, boxMaterial);
    boxMesh.position.set(x, -0.5, y);
    return boxMesh;
  },
  "building-1": (x, y) => {
    return createBuildingMesh(1, x, y, "building-1");
  },
  "building-2": (x, y) => {
    return createBuildingMesh(2, x, y, "building-2");
  },
  "building-3": (x, y) => {
    return createBuildingMesh(3, x, y, "building-3");
  },
};

export function createAssetInstance(assetId, x, y) {
  return asset[assetId](x, y);
}
