export function runDijkstra(grid, startNode, endNode) {
  const visitedNodesInOrder = [];
  const queue = [];
  
  startNode.distance = 0;
  queue.push(startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (currentNode.isVisited) continue;
    
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === endNode) return visitedNodesInOrder;

    const { row, col } = currentNode;
    const neighbors = [];
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    for (const neighbor of neighbors) {
      if (!neighbor.isVisited) {
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
      }
    }
  }
  return visitedNodesInOrder;
}

export function getShortestPath(endNode) {
  const shortestPath = [];
  let currentNode = endNode;
  
  while (currentNode) {
    shortestPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestPath;
}





/*
trying to find way i can apply it 
for now i am thinking to do in 2d grid map


function runDijkstra() {

  const graph = {
    A: { B: 2, C: 5 },
    B: { C: 1, D: 7 },
    C: { D: 3 },
    D: {},
  };

  const distances = {
    A: 0,
    B: Infinity,
    C: Infinity,
    D: Infinity,
  };

  const visited = new Set();
  const previous = { A: null, B: null, C: null, D: null }; 

  function getClosestUnvisitedNode() {
    let minDistance = Infinity;
    let closestNode = null;

    for (let node in distances) {
      if (!visited.has(node) && distances[node] < minDistance) {
        minDistance = distances[node];
        closestNode = node;
      }
    }
    return closestNode;
  }

  console.log("Starting Dij Algo\n");

  let currentNode = getClosestUnvisitedNode();

  while (currentNode !== null) {
    let distanceToCurrent = distances[currentNode];
    let neighbors = graph[currentNode];

    console.log(
      `Currently visiting City ${currentNode} (Time from start: ${distanceToCurrent})`,
    );
    */