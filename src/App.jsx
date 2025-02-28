import { Route, Routes } from "react-router-dom";
import "./App.css";
import LatestNews from "./components/LatestNews";
import Article from "./components/Article";
import { useEffect, useState } from "react";
import { getTopics } from "./utils/api";
import Topic from "./components/Topic";
import NotFound from "./components/NotFound";

function App() {
  const [topics, setTopics] = useState({});
  const [isTopicsLoading, setIsTopicsLoading] = useState(true);
  const [isTopicsError, setIsTopicsError] = useState(false);

  useEffect(() => {
    setIsTopicsLoading(true);
    setIsTopicsError(false);
    getTopics()
      .then((topicsList) => {
        const topicsLookup = {};
        topicsList.forEach(({ slug, description }) => {
          topicsLookup[slug] = description;
        });
        setTopics(topicsLookup);
        setIsTopicsLoading(false);
      })
      .catch((err) => {
        setTopics({});
        setIsTopicsError(true);
      });
  }, []);

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route
        path="/"
        element={
          <LatestNews
            topics={topics}
            isTopicsLoading={isTopicsLoading}
            isTopicsError={isTopicsError}
          />
        }
      />
      <Route
        path="/articles/:articleUrl"
        element={
          <Article
            topics={topics}
            isTopicsLoading={isTopicsLoading}
            isTopicsError={isTopicsError}
          />
        }
      />
      <Route
        path="/topics/:topicSlug"
        element={
          <Topic
            topics={topics}
            isTopicsLoading={isTopicsLoading}
            isTopicsError={isTopicsError}
          />
        }
      />
    </Routes>
  );
}

export default App;
