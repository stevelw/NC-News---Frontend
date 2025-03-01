import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import ErrorComponent from "./ErrorComponent";
import { postArticle } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { pathForArticle } from "../utils/utils";

export default function ArticleComposer() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [articleTitle, setArticleTitle] = useState("");
  const [isErrorPosting, setIsErrorPosting] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setIsErrorPosting(false);
    postArticle(
      user.username,
      articleTitle,
      "articleBody",
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
        <label hidden htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={articleTitle}
          onChange={({ target: { value } }) => setArticleTitle(value)}
          className="article-composer__title"
          placeholder="Title"
        />
        <button
          type="submit"
          disabled={!articleTitle}
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
