import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import ErrorComponent from "./ErrorComponent";
import { postArticle } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { pathForArticle } from "../utils/utils";
import HeaderElement from "./HeaderElement";
import { loadTopicsState } from "../utils/state-loaders";

export default function ArticleComposer() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [isErrorPosting, setIsErrorPosting] = useState(false);

  const [title, setTitle] = useState("");
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isShowErrorTitle, setIsShowErrorTitle] = useState(false);

  const [body, setBody] = useState("");
  const [isBodyValid, setIsBodyValid] = useState(false);
  const [isShowErrorBody, setIsShowErrorBody] = useState(false);

  const [imageURL, setImageURL] = useState("");
  const [isImageURLValid, setIsImageURLValid] = useState(false);
  const [isShowErrorImageURL, setIsShowErrorImageURL] = useState(false);

  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState({});
  const [isTopicsLoading, setIsTopicsLoading] = useState(true);
  const [isTopicsError, setIsTopicsError] = useState(false);

  useEffect(() => {
    loadTopicsState(setTopics, setIsTopicsLoading, setIsTopicsError);
  }, []);

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

  useEffect(() => {
    setIsImageURLValid(() => {
      if (
        imageURL.match(
          /^(https?:\/\/)?[a-z0-9\-\_]+(\.[a-z0-9\-\_]+)*(\.[a-z0-9]+)(\/[a-z0-9\-\_]+)*\/[a-z0-9\-\_]+\.(png|jpeg|jpg)$/i
        )
      ) {
        setIsShowErrorImageURL(false);
        return true;
      } else {
        if (imageURL) setIsShowErrorImageURL(true);
        return false;
      }
    });
  }, [imageURL]);

  function handleSubmit(event) {
    event.preventDefault();
    setIsErrorPosting(false);
    postArticle(
      user.username,
      title,
      body,
      topic,
      imageURL === "" ? undefined : imageURL
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
    <>
      <div className="header header--small-screen-hidden">
        <HeaderElement />
      </div>
      <p className="navigation-button" onClick={() => navigate(-1)}>
        Back
      </p>
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
                isHeadingHidden={true}
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
                isHeadingHidden={true}
              />
            )}
          </div>
          <div className="article-composer__image-url">
            <label hidden htmlFor="image-url">
              URL for image
            </label>
            <input
              id="image-url"
              type="text"
              name="image-url"
              value={imageURL}
              onChange={({ target: { value } }) => setImageURL(value)}
              placeholder="Optional URL for image"
            />
            {isShowErrorImageURL && (
              <ErrorComponent
                message="The URL must be a valid PNG or JPEG file."
                isHeadingHidden={true}
              />
            )}
          </div>
          <div className="article-composer__topic">
            {isTopicsLoading ? (
              <p>Loading topics...</p>
            ) : isTopicsError ? (
              <ErrorComponent
                message="Sorry, we're having problems. Check your internet connection and try again."
                isHeadingHidden={true}
              />
            ) : (
              <label>
                <select
                  name="topic"
                  id="topic"
                  value={topic}
                  onChange={({ target: { value } }) => {
                    setTopic(value);
                  }}
                >
                  <option value=""></option>
                  {Object.keys(topics).map((slug) => {
                    return (
                      <option key={slug} value={slug}>
                        {topics[slug]}
                      </option>
                    );
                  })}
                </select>
              </label>
            )}
          </div>
          <button
            type="submit"
            disabled={
              !(
                isTitleValid &&
                isBodyValid &&
                (imageURL === "" || isImageURLValid) &&
                !isTopicsLoading &&
                topic
              )
            }
            className="article-composer__button"
          >
            Create article
          </button>
        </form>
        {isErrorPosting && (
          <ErrorComponent message="Sorry, we couldn't post that right now. Please try again." />
        )}
      </div>
    </>
  );
}
