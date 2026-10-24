import "./App.css";
import { useState } from "react";

const getInitialGrid = () => {
  const tempGrid = [];
  for (let r = 0; r < 10; r++) {
    const currentRow = [];
    for (let c = 0; c < 10; c++) {
      currentRow.push({ row: r, col: c });
    }
    tempGrid.push(currentRow);
  }
  return tempGrid;
};

function Visualizer() {
  const [grid] = useState(getInitialGrid());

  return (
    <div className="grid">
      <h2>Map</h2>

      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((node, colIndex) => (
            <div key={colIndex} className="node"></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Visualizer;
