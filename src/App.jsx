import { Route, Routes } from "react-router-dom";
import "./App.css";
import LatestNews from "./components/LatestNews";
import Article from "./components/Article";
import Topic from "./components/Topic";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<LatestNews />} />
      <Route path="/articles/:articleUrl" element={<Article />} />
      <Route path="/topics/:topicSlug" element={<Topic />} />
    </Routes>
  );
}

export default App;
