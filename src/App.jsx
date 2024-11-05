import { Route, Routes } from "react-router-dom";
import "./App.css";
import LatestNews from "./components/LatestNews";
import Article from "./components/Article";
import { useEffect, useState } from "react";
import { getTopics } from "./utils/api";

function App() {
  const [topics, setTopics] = useState({});

  useEffect(() => {
    getTopics()
      .then((topicsList) => {
        const topicsLookup = {};
        topicsList.forEach(({ slug, description }) => {
          topicsLookup[slug] = description;
        });
        setTopics(topicsLookup);
      })
      .catch((err) => {
        setTopics({});
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LatestNews topics={topics} />} />
      <Route
        path="/articles/:articleUrl"
        element={<Article topics={topics} />}
      />
    </Routes>
  );
}

export default App;
