import logo from "../assets/logo.png";

export default function HeaderElement() {
  const style = {
    display: "flex",
    justifyContent: "space-between",
    background: "#BBBBBB",
  };
  return (
    <div style={style}>
      <img src={logo} alt="The logo for NC News" width={"100px"} />
      <h1>NC News - When it happens</h1>
    </div>
  );
}
