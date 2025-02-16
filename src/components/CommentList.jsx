import { useContext } from "react";
import ErrorComponent from "./ErrorComponent";
import { UserContext } from "../contexts/UserContext";
import { deleteComment } from "../utils/api";

export default function CommentList({
  comments,
  setComments,
  isLoading,
  isError,
}) {
  const { user } = useContext(UserContext);

  function handleDeleteComment(commentId) {
    setComments((currentComments) => {
      currentComments.find(
        ({ comment_id }) => comment_id === commentId
      ).disabled = true;
      return [...currentComments];
    });
    deleteComment(commentId)
      .then(() => {
        setComments((currentComments) => [
          ...currentComments.filter(
            ({ comment_id }) => comment_id !== commentId
          ),
        ]);
      })
      .catch((err) => {
        setComments((currentComments) => {
          const comment = currentComments.find(
            ({ comment_id }) => comment_id === commentId
          );
          comment.disabled = false;
          comment.error = "Couldn't delete comment. Please try again later.";
          return [...currentComments];
        });
      });
  }

  return (
    <div className="comment-list">
      <h2>Comments</h2>
      {isError ? (
        <ErrorComponent
          message={
            "Error loading comments. Check your network connection and try again"
          }
        />
      ) : null}
      {isLoading && !isError ? (
        <p>Loading...</p>
      ) : comments.length ? (
        comments.map(
          ({ comment_id, created_at, author, body, disabled, error }) => {
            return (
              <div
                key={comment_id ?? Math.random()}
                className={
                  "comment-card" + (disabled ? " comment-card--disabled" : "")
                }
              >
                {user.username === author && comment_id && (
                  <button
                    onClick={() => handleDeleteComment(comment_id)}
                    className="comment-card__button"
                  >
                    &#x2717;
                  </button>
                )}
                {error && <p className="comment-card__error">{error}</p>}
                <p className="comment-card__comment">{body}</p>
                <p className="comment-card__author">{author}</p>
                <p className="comment-card__timestamp">
                  {new Date(created_at).toDateString()}
                </p>
              </div>
            );
          }
        )
      ) : (
        <>
          <p>Be the first to add a comment.</p>
        </>
      )}
    </div>
  );
}
