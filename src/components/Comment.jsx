import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Comment({
  comment_id,
  commentBody,
  author,
  created_at,
  handleDeleteComment,
  disabled,
  error,
}) {
  const { user } = useContext(UserContext);

  return (
    <div
      key={comment_id}
      className={"comment-card" + (disabled ? " comment-card--disabled" : "")}
    >
      {user.username === author && comment_id && (
        <button
          onClick={handleDeleteComment}
          className="comment-card__button"
        >
          &#x2717;
        </button>
      )}
      {error && <p className="comment-card__error">{error}</p>}
      <p className="comment-card__comment">{commentBody}</p>
      <p className="comment-card__author">{author}</p>
      <p className="comment-card__timestamp">
        {new Date(created_at).toDateString()}
      </p>
    </div>
  );
}
