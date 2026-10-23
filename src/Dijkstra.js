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


export default runDijkstra