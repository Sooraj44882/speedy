function runDijkstra() {
  const rows = 5;
  const cols = 5;

  const startId = "0,0";
  const endId = "4,4";

  const distances = {};
  const previous = {};
  const unvisited = new Set();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let id = `${r},${c}`;
      distances[id] = Infinity;
      previous[id] = null;
      unvisited.add(id); 
    }
  }

  distances[startId] = 0;

  function getClosestSquare() {
    let minDistance = Infinity;
    let closestId = null;
    for (let id of unvisited) {
      if (distances[id] < minDistance) {
        minDistance = distances[id];
        closestId = id;
      }
    }
    return closestId;
  }

  let currentId = getClosestSquare();

  while (currentId !== null) {
    let [r, c] = currentId.split(",").map(Number); 

    if (currentId === endId) {
      break; 
    }

    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    for (let dir of directions) {
      let newRow = r + dir[0];
      let newCol = c + dir[1];
      let neighborId = `${newRow},${newCol}`;

      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && unvisited.has(neighborId)) {
        
        let totalDistance = distances[currentId] + 1; 

        if (totalDistance < distances[neighborId]) {
          distances[neighborId] = totalDistance;
          previous[neighborId] = currentId; 
        }
      }
    }

    unvisited.delete(currentId);
    
    currentId = getClosestSquare();
  }

  let path = [];
  let step = endId;
  while (step !== null) {
    path.unshift(step); 
    step = previous[step];
  }

  console.log("Path found");
  console.log(path.join(" -> "));
}

export default runDijkstra

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

    for (let neighbor in neighbors) {
      let travelTime = neighbors[neighbor];
      let totalTime = distanceToCurrent + travelTime;

      if (totalTime < distances[neighbor]) {
        console.log(
          `  Found a faster route to ${neighbor}! Updating notebook from ${distances[neighbor]} to ${totalTime}.`,
        );
        distances[neighbor] = totalTime;
        previous[neighbor] = currentNode; 
      }
    }

    visited.add(currentNode);

    currentNode = getClosestUnvisitedNode();
  }

  let path = [];
  let step = "D"; 

  while (step !== null) {
    path.unshift(step);
    step = previous[step];
  }

  console.log("\nALGO FINISHED");
  console.log(`Fastest Time to D: ${distances.D} minutes`);
  console.log(`Shortest Path: ${path.join(" -> ")}`);
}


export default */