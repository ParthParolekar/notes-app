import "./App.css";
import Mockman from "mockman-js";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Mockman" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
