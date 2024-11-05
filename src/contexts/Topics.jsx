import { createContext, useEffect, useState } from "react";
import { getTopics } from "../utils/api";

export const TopicsContext = createContext();

export const TopicsProvider = ({ children }) => {
  const [topics, setTopics] = useState({});

  useEffect(() => {
    getTopics()
      .then((topics) => {
        const topicsLookup = {};
        topics.forEach(({ slug, description }) => {
          topicsLookup[slug] = description;
        });
        setTopics(topicsLookup);
      })
      .catch((err) => {
        setTopics({});
      });
  }, []);

  return (
    <TopicsContext.Provider value={{ topics, setTopics }}>
      {children}
    </TopicsContext.Provider>
  );
};
