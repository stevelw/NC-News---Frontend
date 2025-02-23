import ErrorComponent from "./ErrorComponent";
import { deleteComment } from "../utils/api";
import Comment from "./Comment";

export default function CommentList({
  comments,
  setComments,
  isLoading,
  isError,
}) {
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
          ({
            comment_id,
            created_at,
            author,
            body,
            votes,
            disabled,
            error,
          }) => {
            return (
              <Comment
                key={comment_id ?? Symbol.for(body+author+created_at)}
                comment_id={comment_id}
                commentBody={body}
                author={author}
                created_at={created_at}
                initialVotes={votes}
                handleDeleteComment={() => handleDeleteComment(comment_id)}
                disabled={disabled}
                error={error}
              />
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
