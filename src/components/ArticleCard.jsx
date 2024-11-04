export default function ArticleCard({ children }) {
  const style = {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px",
  };
  return <div style={style}>{children}</div>;
}
