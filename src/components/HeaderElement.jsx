import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function HeaderElement() {
  return (
    <div className="header">
      <img src={logo} alt="The logo for NC News" className="header__image" />
      <div>
        <h1 className="header__title">NC News - When it happens</h1>
        <Link to={"/report"}>
          <button type="button" className="header__report-button">
            Report your news
          </button>
        </Link>
      </div>
    </div>
  );
}
