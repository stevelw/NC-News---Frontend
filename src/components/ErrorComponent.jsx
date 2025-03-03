export default function ErrorComponent({ message, hideHeading = false }) {
  return hideHeading ? (
    <p>{message}</p>
  ) : (
    <div>
      <h1>Error</h1>
      <p>{message}</p>
    </div>
  );
}
