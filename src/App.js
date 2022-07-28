import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import ChapterDetail from "./containers/ChapterDetail.js";
import VerseDetail from "./containers/VerseDetail.js";

function App() {
  return (
    <div className="App container mx-auto px-3">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:chapter" element={<ChapterDetail />} />
        <Route path="/:chapter/:verse" element={<VerseDetail />} />
        <Route path="*" element={<>404 not found</>} />
      </Routes>
    </div>
  );
}

export default App;
