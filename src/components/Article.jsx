import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import HeaderElement from "./HeaderElement";
import Vote from "./Vote";
import { getArticle } from "../utils/api";
import { useEffect, useState } from "react";
import ErrorComponent from "./ErrorComponent";

export default function Article({ topics }) {
  const articleId = useParams().articleUrl.match(/(?<=-)[^-]+$/);
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
    <>
      <div className="hidden">
        <HeaderElement />
      </div>
      <div className="article-grid">
        <p
          style={{
            gridArea: "top-left-button",
            border: "red solid 1px",
          }}
        >
          Back button
        </p>
        <p
          className="hiddenOnLargeScreen"
          style={{
            gridArea: "top-right-button",
            textAlign: "right",
            border: "red solid 1px",
          }}
        >
          Home button
        </p>
        {isError ? (
          <ErrorComponent
            message={
              "Error loading article. Check your network connection and try again"
            }
          />
        ) : (
          <>
            <h2 style={{ gridArea: "headline" }}>
              {isLoading ? "Loading..." : article.title}
            </h2>
            <p
              style={{
                gridArea: "topic",
                textAlign: "right",
              }}
            >
              {article.topic}
            </p>
            <p
              style={{
                gridArea: "timestamp",
                textAlign: "right",
              }}
            >
              {article.timestamp}
            </p>
            <img
              style={{ gridArea: "image" }}
              src={
                isLoading
                  ? "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
                  : article.article_img_url
              }
              alt=""
            />
            <div style={{ gridArea: "body" }}>
              <p>{article.body}</p>
            </div>
            <p
              style={{
                gridArea: "author",
                textAlign: "right",
              }}
            >
              {article.author}
            </p>
          </>
        )}
      </div>
    </>
  );
}
