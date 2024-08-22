export function createCity(size) {
  const data = [];

  intialize();
  function intialize() {
    for (let x = 0; x < size; x++) {
      let column = [];
      for (let y = 0; y < size; y++) {
        const tile = {
          x,
          y,
          building: undefined,
          update() {
            if (Math.random() < 0.01) {
              if (this.building === undefined) {
                this.building = "building-1";
              } else if (this.building === "building-1") {
                this.building = "building-2";
              } else if (this.building === "building-2") {
                this.building = "building-3";
              }
            }
          },
        };
        column.push(tile);
      }
      data.push(column);
    }
  }

  function update() {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        data[x][y].update();
      }
    }
  }

  return { size, data, update };
}
