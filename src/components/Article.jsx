import { useNavigate, useParams } from "react-router-dom";
import CommentList from "./CommentList";
import HeaderElement from "./HeaderElement";
import { getArticle, getComments } from "../utils/api";
import { useEffect, useState } from "react";
import ErrorComponent from "./ErrorComponent";
import Vote from "./Vote";
import CommentComposer from "./CommentComposer";

export default function Article({ topics }) {
  const articleId = useParams().articleUrl.match(/(?<=-)[^-]+$/);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isCommentLoading, setIsCommentLoading] = useState(true);
  const [isCommentError, setIsCommentError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setIsError("");

    getArticle(articleId)
      .then((returnedArticle) => {
        setArticle(returnedArticle);
        setIsLoading(false);
      })
      .catch((err) => {
        err.status === 404 ? setIsError("404") : setIsError("unhandled");
      });
  }, []);

  useEffect(() => {
    setIsCommentLoading(true);
    setIsCommentError(false);

    getComments(articleId)
      .then((comments) => {
        setComments(comments);
        setIsCommentLoading(false);
      })
      .catch((err) => {
        setIsCommentError(true);
      });
  }, []);

  return (
    <>
      <div className="hiddenOnSmallScreen">
        <HeaderElement />
      </div>
      <div className="article-grid">
        <p style={{ textDecoration: "underline" }} onClick={() => navigate(-1)}>
          Back
        </p>
        {isError && (
          <div style={{ gridArea: "body" }}>
            <ErrorComponent
              message={
                isError === "404"
                  ? "Sorry, that article doesn't exist."
                  : "Error loading article. Check your network connection and try again"
              }
            />
          </div>
        )}
        {!isError && (
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
            <CommentComposer setComments={setComments} setIsError={setIsCommentError} />
            <CommentList comments={comments} isLoading={isCommentLoading} isError={isCommentError} />
          </>
        )}
      </div>
    </>
  );
}
