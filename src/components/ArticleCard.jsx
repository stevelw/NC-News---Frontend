export default function ArticleCard({ children }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "10px",
      }}
    >
      {children}
    </div>
  );
}
