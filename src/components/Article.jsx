import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import Header from "./Header";
import Vote from "./Vote";
import { getArticle } from "../utils/api";
import { useContext, useEffect, useState } from "react";
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
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticle(articleId).then(
      ({ author, title, body, topic, created_at, article_img_url }) => {
        const timestamp = new Date(created_at).toDateString();
        setArticle({
          author,
          title,
          body,
          topic: topics[topic] ?? topic,
          timestamp,
          article_img_url,
        });
      }
    );
  }, []);

  return (
    <div className="article-grid">
      <p style={backButtonStyle}>Back button</p>
      <p style={homeButtonStyle}>Home button</p>
      <h2 style={headlineStyle}>{article.title}</h2>
      <p style={topicStyle}>{article.topic}</p>
      <p style={timestampStyle}>{article.timestamp}</p>
      <img style={imageStyle} src={article.article_img_url} alt="" />
      <div style={bodyStyle}>
        <p>{article.body}</p>
      </div>
      <p style={authorStyle}>{article.author}</p>
      <Vote></Vote>
      <CommentList />
    </div>
  );
}
