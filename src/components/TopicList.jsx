export default function TopicList({ topics, isTopicsLoading, isTopicsError }) {
  return (
    <>
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
        <ul>
          {Object.keys(topics).map((slug) => {
            return <li key={slug}>{topics[slug]}</li>;
          })}
        </ul>
      )}
    </>
  );
}
