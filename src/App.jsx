import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Components/Navbar";
import Visualizer from "./Visualizer";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Visualizer />} />
          <Route
            path="/about"
            element={
              <div className="p-20 text-center text-2xl font-bold">
              
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
