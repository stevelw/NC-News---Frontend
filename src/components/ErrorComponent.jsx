export default function ErrorComponent({ message, isHeadingHidden = false }) {
  return (
    <div>
      {!isHeadingHidden && <h1>Error</h1>}
      <p>{message}</p>
    </div>
  );
}
