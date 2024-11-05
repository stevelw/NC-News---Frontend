import { Route, Routes } from "react-router-dom";
import "./App.css";
import LatestNews from "./components/LatestNews";
import Article from "./components/Article";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LatestNews />} />
      <Route path="/articles/:articleUrl" element={<Article />} />
    </Routes>
  );
}

export default App;
