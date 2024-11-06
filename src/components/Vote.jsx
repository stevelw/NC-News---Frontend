import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle, incrementVotes } from "../utils/api";
import ErrorComponent from "./ErrorComponent";

export default function vote() {
  const articleId = useParams().articleUrl.match(/(?<=-)[^-]+$/);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadError, setIsLoadError] = useState(false);
  const [isUpdateError, setIsUpdateError] = useState(false);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setIsLoadError(false);
    getArticle(articleId)
      .then(({ votes: returnedVotes }) => {
        setVotes(returnedVotes);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoadError(true);
      });
  }, []);

  function handleClick() {
    setVotes((currentVotes) => currentVotes + 1);
    setIsUpdateError(false);
    incrementVotes(articleId).catch((err) => {
      setVotes((currentVotes) => currentVotes - 1);
      setIsUpdateError(true);
    });
  }

  return (
    <div className="vote-widget" style={{ gridArea: "vote-widget" }}>
      {isLoadError ? (
        <ErrorComponent message={`Likes aren't loading right now.`} />
      ) : (
        <>
          <button onClick={handleClick}>+1</button>
          <p>&#128077; {isLoading ? "..." : votes}</p>
          {isUpdateError && (
            <p className="error">
              Sorry, something went wrong. Please try again.
            </p>
          )}
        </>
      )}
    </div>
  );
}
