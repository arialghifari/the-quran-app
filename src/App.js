import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import ChapterInfo from "./containers/ChapterInfo.js";
import ChapterDetail from "./containers/ChapterDetail.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Search from "./containers/Search";

function App() {
  return (
    <div className="App container mx-auto px-3">
      <Header />
      <div className="mt-24" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:chapter" element={<ChapterInfo />} />
        <Route path="/:chapter/:verse" element={<ChapterDetail />} />
        <Route path="/search/:query/:page" element={<Search />} />
        <Route path="/search" element={<>404 Not Found</>} />
        <Route path="*" element={<>404 Not Found</>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
