import { Link } from "react-router-dom";

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
  topics,
  isTopicsLoading,
  isTopicsError,
}) {
  const urlFriendlyTitle = title.replaceAll(/[^a-z]/gi, "-");
  const articleUrl = "/articles/" + urlFriendlyTitle + "-" + article_id;

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
