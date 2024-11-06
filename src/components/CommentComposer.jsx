export default function CommentComposer() {
  return (
    <form style={{gridArea: 'comment'}}>
      <button className="leave-a-comment-button">Leave a comment</button>
      <label hidden htmlFor="comment-input">Comment</label>
      <textarea id="comment-input" className="comment-input"></textarea>
    </form>
  );
}
