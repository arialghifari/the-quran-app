import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import ChapterDetail from "./containers/ChapterDetail.js";
import VerseDetail from "./containers/VerseDetail.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

function App() {
  return (
    <div className="App container mx-auto px-3">
      <Header />
      <div className="mt-28" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:chapter" element={<ChapterDetail />} />
        <Route path="/:chapter/:verse" element={<VerseDetail />} />
        <Route path="*" element={<>404 not found</>} />
      </Routes>
      <div className="mb-8" />
      <Footer />
    </div>
  );
}

export default App;
