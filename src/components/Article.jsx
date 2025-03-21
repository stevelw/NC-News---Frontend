import { Link, useNavigate, useParams } from "react-router-dom";
import CommentList from "./CommentList";
import HeaderElement from "./HeaderElement";
import { getArticle, getComments, incrementArticleVotes } from "../utils/api";
import { useEffect, useState } from "react";
import ErrorComponent from "./ErrorComponent";
import Vote from "./Vote";
import CommentComposer from "./CommentComposer";
import { loadTopicsState } from "../utils/state-loaders";

export default function Article() {
  const articleId = useParams().articleUrl.match(/(?<=-)[^-]+$/);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isCommentLoading, setIsCommentLoading] = useState(true);
  const [isCommentError, setIsCommentError] = useState(false);
  const [isCommentReloading, setIsCommentReloading] = useState(false);
  const navigate = useNavigate();
  const [topics, setTopics] = useState({});
  const [isTopicsLoading, setIsTopicsLoading] = useState(true);
  const [isTopicsError, setIsTopicsError] = useState(false);

  useEffect(() => {
    loadTopicsState(setTopics, setIsTopicsLoading, setIsTopicsError);
  }, []);

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
    if (isCommentReloading) {
      setIsCommentReloading(false);
    } else {
      setIsCommentLoading(true);
    }
    setIsCommentError(false);

    getComments(articleId)
      .then((comments) => {
        setComments(comments);
        setIsCommentLoading(false);
      })
      .catch((err) => {
        setIsCommentError(true);
      });
  }, [isCommentReloading]);

  return (
    <>
      <div className="header header--small-screen-hidden">
        <HeaderElement />
      </div>
      <div className="article">
        <p className="navigation-button" onClick={() => navigate(-1)}>
          Back
        </p>
        {isError && (
          <div className="article__error">
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
            <h2 className="article__headline">
              {isLoading ? "Loading..." : article.title}
            </h2>
            <p className="article__topic">
              {isTopicsError || isTopicsLoading ? (
                article.topic
              ) : (
                <Link to={"/topics/" + article.topic}>
                  {topics[article.topic]}
                </Link>
              )}
            </p>
            <p className="article__timestamp">
              {article.created_at &&
                new Date(article.created_at).toDateString()}
            </p>
            <img
              className="article__image"
              src={
                isLoading
                  ? "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
                  : article.article_img_url
              }
              alt=""
            />
            <p className="article__body">{article.body}</p>
            <p className="article__author">{article.author}</p>
            <Vote
              initialVotes={article.votes}
              incrementVotes={() => incrementArticleVotes(articleId)}
            />
            <CommentComposer
              setComments={setComments}
              setIsCommentReloading={setIsCommentReloading}
            />
            <CommentList
              comments={comments}
              setComments={setComments}
              isLoading={isCommentLoading}
              isError={isCommentError}
            />
          </>
        )}
      </div>
    </>
  );
}
