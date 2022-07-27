import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import Chapter from "./containers/ChapterDetail.js";

function App() {
  return (
    <div className="App container mx-auto px-3">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:chapter" element={<Chapter />} />
        <Route path="/:chapter/:verse" element={<Chapter />} />
      </Routes>
    </div>
  );
}

export default App;
