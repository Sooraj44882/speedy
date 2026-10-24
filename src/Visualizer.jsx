import { useState } from "react";
import { runDijkstra, getShortestPath } from './Dijkstra.js';
import "./App.css";

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
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
      });
    }
    tempGrid.push(currentRow);
  }
  return tempGrid;
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

function Visualizer() {
  const [grid, setGrid] = useState(getInitialGrid());
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

const animateAlgorithm = (visitedNodesInOrder, shortestPath) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(shortestPath);
        }, 20 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!node.isStart && !node.isEnd) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }, 20 * i);
    }
  };

  const animateShortestPath = (shortestPath) => {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        if (!node.isStart && !node.isEnd) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-path";
        }
      }, 50 * i);
    }
  };

  const startSearch = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    
    const visitedNodesInOrder = runDijkstra(grid, startNode, endNode);
    const shortestPath = getShortestPath(endNode);
    
    animateAlgorithm(visitedNodesInOrder, shortestPath);
  };

  return (
    <div className="grid">
      <h2>Speedy Delivery Map</h2>
      <button
        onClick={startSearch}
        style={{ marginBottom: "20px", padding: "10px",border:"2px solid black ",borderRadius: "5px" }
      }
      >
        Start Delivery
      </button>

      <div onMouseLeave={() => setMouseIsPressed(false)}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((node, colIndex) => {
              let extraClass = "";
              if (node.isStart) extraClass = "node-start";
              else if (node.isEnd) extraClass = "node-end";
              else if (node.isWall) extraClass = "node-wall";

              return (
                <div
                  key={colIndex}
                  id={`node-${node.row}-${node.col}`}
                  className={`node ${extraClass}`}
                  onMouseDown={() => handleMouseDown(node.row, node.col)}
                  onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                  onMouseUp={() => handleMouseUp()}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Visualizer;
