import { Link } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";

export default function TopicList({ topics, isTopicsLoading, isTopicsError }) {
  return (
    <div className="topic-list">
      <h2>Topics</h2>
      {isTopicsError ? (
        <ErrorComponent
          message={
            "Error loading topics. Check your network connection and try again."
          }
        />
      ) : null}
      {isTopicsLoading && !isTopicsError ? (
        <p>Loading...</p>
      ) : (
        <ul className="topic-list__list">
          {Object.keys(topics).map((slug) => {
            return (
              <li key={slug}>
                <Link to={"/topics/" + slug}>{topics[slug]}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
