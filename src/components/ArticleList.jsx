import ArticleCard from "./ArticleCard";

export default function ArticleList({ articles }) {
  const childStyle = {
    maxWidth: "40%",
    maxHeight: "100px",
  };
  return (
    <>
      {articles.map((article) => {
        return (
          <ArticleCard key={article}>
            <div style={childStyle}>
              <h3>Headline</h3>
              <p>Topic</p>
            </div>
            <img
              style={childStyle}
              src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
              alt="A placeholder image"
            />
          </ArticleCard>
        );
      })}
    </>
  );
}
