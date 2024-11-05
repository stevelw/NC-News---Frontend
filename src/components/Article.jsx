import CommentList from "./CommentList";
import Header from "./Header";
import Vote from "./Vote";
export default function Artical() {
  const backButtonStyle = { gridArea: "top-left-button" };
  const homeButtonStyle = { gridArea: "top-right-button", textAlign: "right" };
  const headlineStyle = { gridArea: "headline" };
  const topicStyle = { gridArea: "topic", textAlign: "right" };
  const timestampStyle = { gridArea: "timestamp", textAlign: "right" };
  const imageStyle = { gridArea: "image" };
  const bodyStyle = { gridArea: "body" };
  const authorStyle = { gridArea: "author", textAlign: "right" };

  return (
    <div className="artical-grid">
      <p style={backButtonStyle}>Back button</p>
      <p style={homeButtonStyle}>Home button</p>
      <h2 style={headlineStyle}>Headline</h2>
      <p style={topicStyle}>Topic</p>
      <p style={timestampStyle}>date/time</p>
      <img
        style={imageStyle}
        src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
        alt=""
      />
      <p style={bodyStyle}>body</p>
      <p style={authorStyle}>author</p>
      <Vote></Vote>
      <CommentList />
    </div>
  );
}
