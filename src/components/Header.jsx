export default function Header() {
  const style = {
    display: "flex",
    justifyContent: "space-between",
    background: "#BBBBBB",
  };
  return (
    <div style={style}>
      <img
        src="src/assets/logo.png"
        alt="The logo for NC News"
        width={"100px"}
      />
      <h1>NC News - When it happens</h1>
    </div>
  );
}
