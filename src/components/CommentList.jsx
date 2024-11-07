import ErrorComponent from "./ErrorComponent";
import { useParams } from "react-router-dom";

export default function CommentList({ comments, isLoading, isError }) {
  const articleId = useParams().articleUrl.match(/(?<=-)[^-]+$/);

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
              <div key={comment_id ?? Math.random()} className="commentCard">
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
