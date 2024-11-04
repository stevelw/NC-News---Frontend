export default function Center({ children }) {
  const style = {
    display: "flex",
    justifyContent: "center",
  };
  return <div style={style}>{children}</div>;
}
