import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1>Breaking news...</h1>
      <p>Sorry, that page doesn't exist.</p>
      <Link to={"/"}>
        <button>Go back to the homepage</button>
      </Link>
    </>
  );
}
