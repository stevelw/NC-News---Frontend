import { useContext, useState } from "react";
import { postComment } from "../utils/api";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function CommentComposer() {
  const {user} = useContext(UserContext)
  const articleId = useParams().articleUrl.match(/(?<=-)[^-]+$/);
  const [commentInput, setCommentInput] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    postComment(articleId, commentInput, user.username)
      .then(() => {
        setCommentInput("");
      })
      .catch((err) => {});
  }

  return (
    <form onSubmit={handleSubmit} style={{ gridArea: "comment" }}>
      <button
        type="submit"
        disabled={!commentInput}
        className="leave-a-comment-button"
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
        className="comment-input"
      ></textarea>
    </form>
  );
}
