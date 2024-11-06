import { useNavigate, useParams } from "react-router-dom";
import CommentList from "./CommentList";
import HeaderElement from "./HeaderElement";
import { getArticle } from "../utils/api";
import { useEffect, useState } from "react";
import ErrorComponent from "./ErrorComponent";
import Vote from "./Vote";

export default function Article({ topics }) {
  const articleId = useParams().articleUrl.match(/(?<=-)[^-]+$/);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [article, setArticle] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getArticle(articleId)
      .then((returnedArticle) => {
        setArticle(returnedArticle);
        setIsLoading(false);
      })
      .catch((err) => setIsError(true));
  }, []);

  return (
    <>
      <div className="hiddenOnSmallScreen">
        <HeaderElement />
      </div>
      <div className="article-grid">
        {isError ? (
          <ErrorComponent
            message={
              "Error loading article. Check your network connection and try again"
            }
          />
        ) : (
          <>
            <p
              style={{ textDecoration: "underline" }}
              onClick={() => navigate(-1)}
            >
              Back
            </p>
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
              {new Date(article.created_at).toDateString()}
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
            <Vote />
            <CommentList />
          </>
        )}
      </div>
    </>
  );
}
