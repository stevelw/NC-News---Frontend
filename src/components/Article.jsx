import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import Header from "./Header";
import Vote from "./Vote";
import { getArtical } from "../utils/api";
import { useContext } from "react";
import { TopicsContext } from "../contexts/Topics";

export default function Article() {
  const backButtonStyle = {
    gridArea: "top-left-button",
    border: "red solid 1px",
  };
  const homeButtonStyle = {
    gridArea: "top-right-button",
    textAlign: "right",
    border: "red solid 1px",
  };
  const headlineStyle = { gridArea: "headline" };
  const topicStyle = {
    gridArea: "topic",
    textAlign: "right",
  };
  const timestampStyle = {
    gridArea: "timestamp",
    textAlign: "right",
  };
  const imageStyle = { gridArea: "image" };
  const bodyStyle = { gridArea: "body" };
  const authorStyle = {
    gridArea: "author",
    textAlign: "right",
  };

  const articleId = useParams().articleUrl.match(/(?<=-)[^-]+$/);
  const { topics, setTopics } = useContext(TopicsContext);

  const { author, title, body, topic, created_at, article_img_url } =
    getArtical();
  const timestamp = new Date(created_at).toDateString();

  return (
    <div className="article-grid">
      <p style={backButtonStyle}>Back button</p>
      <p style={homeButtonStyle}>Home button</p>
      <h2 style={headlineStyle}>{title}</h2>
      <p style={topicStyle}>{topics[topic] ?? topic}</p>
      <p style={timestampStyle}>{timestamp}</p>
      <img style={imageStyle} src={article_img_url} alt="" />
      <div style={bodyStyle}>
        <p>{body}</p>
      </div>
      <p style={authorStyle}>{author}</p>
      <Vote></Vote>
      <CommentList />
    </div>
  );
}
