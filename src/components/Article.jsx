import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import HeaderElement from "./HeaderElement";
import Vote from "./Vote";
import { getArticle } from "../utils/api";
import { useContext, useEffect, useState } from "react";
import { TopicsContext } from "../contexts/Topics";
import ErrorComponent from "./ErrorComponent";

export default function Article() {
  const backButtonStyle = {
    gridArea: "top-left-button",
    border: "red solid 1px",
  };
  const homeButtonStyle = {
    gridArea: "top-right-button",
    textAlign: "right",
    border: "red solid 1px",
  };
  const headlineStyle = { gridArea: "headline" };
  const topicStyle = {
    gridArea: "topic",
    textAlign: "right",
  };
  const timestampStyle = {
    gridArea: "timestamp",
    textAlign: "right",
  };
  const imageStyle = { gridArea: "image" };
  const bodyStyle = { gridArea: "body" };
  const authorStyle = {
    gridArea: "author",
    textAlign: "right",
  };

  const articleId = useParams().articleUrl.match(/(?<=-)[^-]+$/);
  const { topics, setTopics } = useContext(TopicsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [article, setArticle] = useState({});

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticle(articleId)
      .then(({ author, title, body, topic, created_at, article_img_url }) => {
        const timestamp = new Date(created_at).toDateString();
        setArticle({
          author,
          title,
          body,
          topic: topics[topic] ?? topic,
          timestamp,
          article_img_url,
        });
        setIsLoading(false);
      })
      .catch((err) => setIsError(true));
  }, []);

  return (
    <div className="article-grid">
      <p style={backButtonStyle}>Back button</p>
      <p style={homeButtonStyle}>Home button</p>
      {isError ? (
        <ErrorComponent
          message={
            "Error loading article. Check your network connection and try again"
          }
        />
      ) : (
        <>
          <h2 style={headlineStyle}>
            {isLoading ? "Loading..." : article.title}
          </h2>
          <p style={topicStyle}>{article.topic}</p>
          <p style={timestampStyle}>{article.timestamp}</p>
          <img
            style={imageStyle}
            src={
              isLoading
                ? "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
                : article.article_img_url
            }
            alt=""
          />
          <div style={bodyStyle}>
            <p>{article.body}</p>
          </div>
          <p style={authorStyle}>{article.author}</p>
          {/* TODO: Show username */}
          <Vote></Vote>
          <CommentList />
        </>
      )}
    </div>
  );
}
