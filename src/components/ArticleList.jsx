import { useContext } from "react";
import { TopicsContext } from "../contexts/Topics";
import ArticleCard from "./ArticleCard";
import { Link } from "react-router-dom";

export default function ArticleList({ articles }) {
  const childStyle = {
    maxWidth: "45%",
  };

  const { topics, setTopics } = useContext(TopicsContext);

  return (
    <div
      style={{
        gridArea: "grid1",
      }}
    >
      {articles.map(({ article_id, title, topic, article_img_url }) => {
        const urlFriendlyTitle = title.replaceAll(/[^a-z]/gi, "-");
        const articleUrl = "/articles/" + urlFriendlyTitle + "-" + article_id;
        return (
          <ArticleCard key={article_id}>
            <div style={childStyle}>
              <Link to={articleUrl}>
                <h3>{title}</h3>
              </Link>
              <p>{topics[topic] ?? topic}</p>
            </div>
            <img style={childStyle} src={article_img_url} alt="" />
          </ArticleCard>
        );
      })}
    </div>
  );
}
