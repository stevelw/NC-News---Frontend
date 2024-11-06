import { useState, useEffect } from "react";
import { getComments } from "../utils/api";
import ErrorComponent from "./ErrorComponent";

export default function CommentList({ articleId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getComments()
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, [articleId]);

  return (
    <div style={{ gridArea: "comment-list" }}>
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
      ) : (
        <>
          {comments.map(({ comment_id, created_at, author, body }) => {
            return (
              <div key={comment_id} className="commentBox">
                <p className="comment">{body}</p>
                <p className="author">{author}</p>
                <p className="timestamp">
                  {new Date(created_at).toDateString()}
                </p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
