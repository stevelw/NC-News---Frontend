import { useContext, useState } from "react";
import { postComment } from "../utils/api";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import ErrorComponent from "./ErrorComponent";

export default function CommentComposer({ setComments, setIsCommentReloading }) {
  const { user } = useContext(UserContext);
  const articleId = useParams().articleUrl.match(/(?<=-)[^-]+$/);
  const [commentInput, setCommentInput] = useState("");
  const [isErrorPosting, setIsErrorPosting] = useState(false);

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
        setIsErrorPosting(false);
      })
      .catch(() => {
        setIsErrorPosting(true);
        setComments((currentComments) => currentComments.slice(1));
      });
  }

  return (
    <div className="comment-composer">
      <form onSubmit={handleSubmit}>
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
      {isErrorPosting && (
        <ErrorComponent message="Sorry, we couldn't post that comment right now. Please try again." />
      )}
    </div>
  );
}
