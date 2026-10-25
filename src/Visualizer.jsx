import { useState } from "react";
import { runDijkstra, getShortestPath } from "./Dijkstra.js";
import "./App.css";

const START_NODE_ROW = 1;
const START_NODE_COL = 1;
const END_NODE_ROW = 8;
const END_NODE_COL = 8;

const getInitialGrid = (startRow, startCol, endRow, endCol) => {
  const tempGrid = [];
  for (let r = 0; r < 10; r++) {
    const currentRow = [];
    for (let c = 0; c < 10; c++) {
      currentRow.push({
        row: r,
        col: c,
        isStart: r === startRow && c === startCol,
        isEnd: r === endRow && c === endCol,
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
  const [startNodePos, setStartNodePos] = useState({
    row: START_NODE_ROW,
    col: START_NODE_COL,
  });
  const [endNodePos, setEndNodePos] = useState({
    row: END_NODE_ROW,
    col: END_NODE_COL,
  });
  const [grid, setGrid] = useState(
    getInitialGrid(START_NODE_ROW, START_NODE_COL, END_NODE_ROW, END_NODE_COL),
  );

  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [drawMode, setDrawMode] = useState("WALL");
  const handleMouseDown = (row, col) => {
    if (drawMode === "START") {
      if (row === endNodePos.row && col === endNodePos.col) return; // Prevent overwriting dropoff

      const newGrid = grid.slice();
      newGrid[startNodePos.row][startNodePos.col] = {
        ...newGrid[startNodePos.row][startNodePos.col],
        isStart: false,
      };
      newGrid[row][col] = {
        ...newGrid[row][col],
        isStart: true,
        isWall: false,
      };

      setStartNodePos({ row, col });
      setGrid(newGrid);
    } else if (drawMode === "END") {
      if (row === startNodePos.row && col === startNodePos.col) return; // Prevent overwriting pickup

      const newGrid = grid.slice();
      newGrid[endNodePos.row][endNodePos.col] = {
        ...newGrid[endNodePos.row][endNodePos.col],
        isEnd: false,
      };
      newGrid[row][col] = { ...newGrid[row][col], isEnd: true, isWall: false };

      setEndNodePos({ row, col });
      setGrid(newGrid);
    } else {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
      setMouseIsPressed(true);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed || drawMode !== "WALL") return;
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
    const startNode = grid[startNodePos.row][startNodePos.col];
    const endNode = grid[endNodePos.row][endNodePos.col];

    const visitedNodesInOrder = runDijkstra(grid, startNode, endNode);
    const shortestPath = getShortestPath(endNode);

    animateAlgorithm(visitedNodesInOrder, shortestPath);
  };

  const clearGrid = () => {
    setGrid(
      getInitialGrid(
        startNodePos.row,
        startNodePos.col,
        endNodePos.row,
        endNodePos.col,
      ),
    );

    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        const node = document.getElementById(`node-${r}-${c}`);
        if (r === startNodePos.row && c === startNodePos.col) {
          node.className = "node node-start";
        } else if (r === endNodePos.row && c === endNodePos.col) {
          node.className = "node node-end";
        } else {
          node.className = "node";
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 mb-20 font-sans">
      <h2 className="text-2xl font-bold text-black mb-4">
        Speedy Delivery Map
      </h2>

      <div className="mb-4">
        <button
          onClick={startSearch}
          className="bg-black text-white px-4 py-2 mr-3 font-semibold border border-black hover:bg-gray-800"
        >
          Start Delivery
        </button>
        <button
          onClick={clearGrid}
          className="bg-white text-black px-4 py-2 font-semibold border border-black hover:bg-gray-100"
        >
          Clear Grid
        </button>
      </div>

      <div className="flex gap-2 mb-6 text-sm items-center">
        <span className="font-bold mr-2">Click Action:</span>
        <button
          onClick={() => setDrawMode("WALL")}
          className={`px-3 py-1 border border-black ${drawMode === "WALL" ? "bg-black text-white" : "bg-white text-black"}`}
        >
          Draw Traffic
        </button>
        <button
          onClick={() => setDrawMode("START")}
          className={`px-3 py-1 border border-black ${drawMode === "START" ? "bg-black text-white" : "bg-white text-black"}`}
        >
          Move Pickup
        </button>
        <button
          onClick={() => setDrawMode("END")}
          className={`px-3 py-1 border border-black ${drawMode === "END" ? "bg-black text-white" : "bg-white text-black"}`}
        >
          Move Dropoff
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-[#2ecc71] border border-gray-400"></div>{" "}
          Pickup
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-[#e74c3c] border border-gray-400"></div>{" "}
          Dropoff
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-[rgb(12,53,71)] border border-gray-400"></div>{" "}
          Traffic (Wall)
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-[rgba(0,190,255,0.5)] border border-gray-400"></div>{" "}
          Searching
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-yellow-400 border border-gray-400"></div>{" "}
          Route
        </div>
      </div>

      <div className="grid">
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
    </div>
  );
}

export default Visualizer;
