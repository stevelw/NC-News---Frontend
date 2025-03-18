import { Link } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import { useEffect, useState } from "react";
import { loadTopicsState } from "../utils/state-loaders";

export default function TopicList() {
  const [topics, setTopics] = useState({});
  const [isTopicsLoading, setIsTopicsLoading] = useState(true);
  const [isTopicsError, setIsTopicsError] = useState(false);

  useEffect(() => {
    loadTopicsState(setTopics, setIsTopicsLoading, setIsTopicsError);
  }, []);

  return (
    <div className="topic-list">
      <h2>Topics</h2>
      {isTopicsError ? (
        <ErrorComponent
          message={
            "Error loading topics. Check your network connection and try again."
          }
        />
      ) : null}
      {isTopicsLoading && !isTopicsError ? (
        <p>Loading...</p>
      ) : (
        <ul className="topic-list__list">
          {Object.keys(topics).map((slug) => {
            return (
              <li key={slug}>
                <Link to={"/topics/" + slug}>{topics[slug]}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
