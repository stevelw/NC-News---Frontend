import { useContext, useState } from "react";
import { postComment } from "../utils/api";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function CommentComposer({
  setComments,
  setIsError,
  setIsCommentReloading,
}) {
  const { user } = useContext(UserContext);
  const articleId = useParams().articleUrl.match(/(?<=-)[^-]+$/);
  const [commentInput, setCommentInput] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setComments((currentComments) => [
      {
        comment_id: undefined,
        votes: 0,
        created_at: Date(),
        author: user.username,
        body: commentInput,
        article_id: articleId,
      },
      ...currentComments,
    ]);
    postComment(articleId, commentInput, user.username)
      .then(() => {
        setCommentInput("");
        setIsCommentReloading(true);
      })
      .catch((err) => {
        setIsError(true);
        setComments((currentComments) => currentComments.slice(1));
      });
  }

  return (
    <form onSubmit={handleSubmit} className="comment-composer">
      <button
        type="submit"
        disabled={!commentInput}
        className="comment-composer__button"
      >
        Leave a comment
      </button>
      <label hidden htmlFor="comment-input">
        Comment
      </label>
      <textarea
        id="comment-input"
        value={commentInput}
        onChange={({ target: { value } }) => setCommentInput(value)}
        className="comment-composer__input"
      ></textarea>
    </form>
  );
}
