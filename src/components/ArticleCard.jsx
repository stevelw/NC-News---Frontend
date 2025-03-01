import { Link } from "react-router-dom";
import { getTopics } from "../utils/api";
import { useEffect, useState } from "react";

export default function ArticleCard({
  article: {
    article_id,
    title,
    topic,
    article_img_url,
    created_at,
    comment_count,
    votes,
  },
}) {
  const urlFriendlyTitle = title.replaceAll(/[^a-z]/gi, "-");
  const articleUrl = "/articles/" + urlFriendlyTitle + "-" + article_id;
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
    <div className="article-card">
      <div className="article-card__section">
        <Link to={articleUrl}>
          <h3>{title}</h3>
        </Link>
        {isTopicsError || isTopicsLoading ? (
          <p>{topic}</p>
        ) : (
          <Link to={"/topics/" + topic}>
            <p>{topics[topic]}</p>
          </Link>
        )}
        <p>{new Date(created_at).toDateString()}</p>
        <p>
          {comment_count} comment{comment_count > 1 && "s"}
        </p>
        <p>&#128077; {votes}</p>
      </div>
      <img
        className="article-card__section article-card__image"
        src={article_img_url}
        alt=""
      />
    </div>
  );
}
