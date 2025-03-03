import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import ErrorComponent from "./ErrorComponent";
import { postArticle } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { pathForArticle } from "../utils/utils";

export default function ArticleComposer() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isShowErrorTitle, setIsShowErrorTitle] = useState(false);
  const [body, setBody] = useState("");
  const [isBodyValid, setIsBodyValid] = useState(false);
  const [isShowErrorBody, setIsShowErrorBody] = useState(false);
  const [isErrorPosting, setIsErrorPosting] = useState(false);

  useEffect(() => {
    setIsTitleValid(() => {
      if (title.length >= 1 && title.length <= 64) {
        setIsShowErrorTitle(false);
        return true;
      } else {
        if (title) setIsShowErrorTitle(true);
        return false;
      }
    });
  }, [title]);

  useEffect(() => {
    setIsBodyValid(() => {
      if (body.length >= 1 && body.length <= 2500) {
        setIsShowErrorBody(false);
        return true;
      } else {
        if (body) setIsShowErrorBody(true);
        return false;
      }
    });
  }, [body]);

  function handleSubmit(event) {
    event.preventDefault();
    setIsErrorPosting(false);
    postArticle(
      user.username,
      title,
      body,
      "cooking",
      "https://commons.wikimedia.org/wiki/File:Blue_Tiles_-_Free_For_Commercial_Use_-_FFCU_(26777905945).jpg"
    )
      .then(
        ({
          data: {
            article: { article_id, title },
          },
        }) => {
          navigate(pathForArticle(article_id, title));
        }
      )
      .catch(() => {
        setIsErrorPosting(true);
      });
  }

  return (
    <div className="article-composer">
      <form onSubmit={handleSubmit}>
        <div className="article-composer__title">
          <label hidden htmlFor="title">
            Title
          </label>
          <input
            autoFocus
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={({ target: { value } }) => setTitle(value)}
            placeholder="Title"
          />
          {isShowErrorTitle && (
            <ErrorComponent
              message="Title must be between 1 and 64 characters."
              isHeadinghidden={true}
            />
          )}
        </div>
        <div className="article-composer__body">
          <label hidden htmlFor="body">
            Article text
          </label>
          <textarea
            id="body"
            name="body"
            value={body}
            onChange={({ target: { value } }) => setBody(value)}
            placeholder="Article text"
          />
          {isShowErrorBody && (
            <ErrorComponent
              message="The article text must be at least 1 character long."
              isHeadinghidden={true}
            />
          )}
        </div>
        <button
          type="submit"
          disabled={!isTitleValid || !isBodyValid}
          className="article-composer__button"
        >
          Create article
        </button>
      </form>
      {isErrorPosting && (
        <ErrorComponent message="Sorry, we couldn't post that right now. Please try again." />
      )}
    </div>
  );
}
