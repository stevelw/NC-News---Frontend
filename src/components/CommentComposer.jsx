import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function CommentComposer() {
  const {user} = useContext(UserContext)

  return (
    <form style={{gridArea: 'comment'}}>
      <button className="leave-a-comment-button">Leave a comment</button>
      <label hidden htmlFor="comment-input">Comment</label>
      <textarea id="comment-input" className="comment-input"></textarea>
    </form>
  );
}
