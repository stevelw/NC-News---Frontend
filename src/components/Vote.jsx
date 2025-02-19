import { useEffect, useState } from "react";

export default function Vote({ initialVotes, incrementVotes }) {
  const [isUpdateError, setIsUpdateError] = useState(false);
  const [displayedVotes, setDisplayedVotes] = useState(0);

  useEffect(() => {
    setDisplayedVotes(initialVotes);
  }, [initialVotes]);

  function handleClick() {
    setDisplayedVotes((currentVotes) => currentVotes + 1);
    setIsUpdateError(false);
    incrementVotes().catch(() => {
      setDisplayedVotes((currentVotes) => currentVotes - 1);
      setIsUpdateError(true);
    });
  }

  return (
    <div className="vote-widget">
      <button className="vote-widget__button" onClick={handleClick}>
        +1
      </button>
      <p>&#128077; {displayedVotes}</p>
      {isUpdateError && (
        <p className="vote-widget--error">
          Sorry, something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
