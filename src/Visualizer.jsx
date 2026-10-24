import "./App.css";
import { useState } from "react";

const START_NODE_ROW = 1;
const START_NODE_COL = 1;
const END_NODE_ROW = 8;
const END_NODE_COL = 8;

const getInitialGrid = () => {
  const tempGrid = [];
  for (let r = 0; r < 10; r++) {
    const currentRow = [];
    for (let c = 0; c < 10; c++) {
      currentRow.push({ 
        row: r, 
        col: c,
        isStart: r === START_NODE_ROW && c === START_NODE_COL,
        isEnd: r === END_NODE_ROW && c === END_NODE_COL,
      });
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
          {row.map((node, colIndex) => {
            
            let extraClass = '';
            if (node.isStart) extraClass = 'node-start';
            if (node.isEnd) extraClass = 'node-end';

            return (
              <div 
                key={colIndex} 
                id={`node-${node.row}-${node.col}`} 
                className={`node ${extraClass}`}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Visualizer;
