import { useEffect } from "react";
import runDijkstra from "./Dijkstra";
import Visualizer from "./Visualizer";

const App = () => {
  useEffect(() => {
    runDijkstra();
  }, []);

  return (
    <div>
      <h1 className="text-center">Speedy</h1>
      <Visualizer/>
    </div>
  );
};

export default App;