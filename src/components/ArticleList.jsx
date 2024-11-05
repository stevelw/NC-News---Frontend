import { useContext } from "react";
import { TopicsContext } from "../contexts/Topics";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ articles }) {
  const style = {
    gridArea: "grid1",
  };
  const childStyle = {
    maxWidth: "45%",
  };

  const {topics, setTopics} = useContext(TopicsContext)

  return (
    <div style={style}>
      {articles.map(({ article_id, title, topic, article_img_url }) => {
        return (
          <ArticleCard key={article_id}>
            <div style={childStyle}>
              <h3>{title}</h3>
              <p>{topics[topic] ?? topic}</p>
            </div>
            <img
              style={childStyle}
              src={article_img_url}
              alt=""
            />
          </ArticleCard>
        );
      })}
    </div>
  );
}
