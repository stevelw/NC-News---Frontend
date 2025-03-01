import { useNavigate, useParams } from "react-router-dom";
import HeaderElement from "./HeaderElement";
import ErrorComponent from "./ErrorComponent";
import TopicList from "./TopicList";
import ArticleList from "./ArticleList";
import { useEffect, useState } from "react";
import { getTopics } from "../utils/api";

export default function Topic() {
  const { topicSlug } = useParams();
  const navigate = useNavigate();
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
    <>
      <div className="header--small-screen-hidden">
        <HeaderElement />
      </div>
      <p className="navigation-button" onClick={() => navigate(-1)}>
        Back
      </p>
      {isTopicsError && (
        <ErrorComponent
          message={`Error loading topic. Check your network connection and try again.`}
        />
      )}
      {isTopicsLoading && <p>Loading...</p>}
      {!isTopicsError && !isTopicsLoading && !topics[topicSlug] && (
        <>
          <p>Sorry, that topic doesn't exist.</p>
          <p>How about...</p>
          <TopicList
            topics={topics}
            isTopicsLoading={isTopicsLoading}
            isTopicsError={isTopicsError}
          />
        </>
      )}
      {!isTopicsLoading && !isTopicsError && topics[topicSlug] && (
        <>
          <h1>{topics[topicSlug]}</h1>
          <ArticleList
            topics={topics}
            isTopicsLoading={isTopicsLoading}
            isTopicsError={isTopicsError}
            filterTopic={topicSlug}
          />
        </>
      )}
    </>
  );
}
