import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/css/main.min.css";
import "./assets/css/custom.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
import Navbar from "./layouts/Navbar";

import ItemsUpdate from "./pages/Itemsupdate";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/updateditem" element={<ItemsUpdate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
