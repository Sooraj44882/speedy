import { useEffect } from "react";
import runDijkstra from "./Dijkstra";

const App = () => {
  useEffect(() => {
    runDijkstra();
  }, []);

  return (
    <div>
      <h1>App</h1>
    </div>
  );
};

export default App;