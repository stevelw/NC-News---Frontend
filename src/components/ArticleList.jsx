import ArticleCard from "./ArticleCard";

export default function ArticleList({ articles }) {
  const style = {
    gridArea: "grid1",
  };
  const childStyle = {
    maxWidth: "40%",
    maxHeight: "100px",
  };
  return (
    <div style={style}>
      {articles.map(({ article_id, title, topic, article_img_url }) => {
        return (
          <ArticleCard key={article_id}>
            <div style={childStyle}>
              <h3>{title}</h3>
              <p>{topic}</p>
            </div>
            <img
              style={childStyle}
              src={article_img_url}
              alt="A placeholder image"
            />
          </ArticleCard>
        );
      })}
    </div>
  );
}
