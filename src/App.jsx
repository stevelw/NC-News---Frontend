import { Route, Routes } from "react-router-dom";
import "./App.css";
import LatestNews from "./components/LatestNews";
import Artical from "./components/Article";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LatestNews />} />
      <Route path="/articles/:articleUrl" element={<Artical />} />
    </Routes>
  );
}

export default App;
