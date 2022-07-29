import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import ChapterInfo from "./containers/ChapterInfo.js";
import ChapterDetail from "./containers/ChapterDetail.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

function App() {
  return (
    <div className="App container mx-auto px-3">
      <Header />
      <div className="mt-24" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:chapter" element={<ChapterInfo />} />
        <Route path="/:chapter/:verse" element={<ChapterDetail />} />
        <Route path="*" element={<>Not found</>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
