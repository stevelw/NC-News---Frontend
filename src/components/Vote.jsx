import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../utils/api";
import ErrorComponent from "./ErrorComponent";

export default function vote() {
  const articleId = useParams().articleUrl.match(/(?<=-)[^-]+$/);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticle(articleId)
      .then(({ votes: returnedVotes }) => {
        setVotes(returnedVotes);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, []);

  return (
    <div className="vote-widget" style={{ gridArea: "vote-widget" }}>
      {isError ? (
        <ErrorComponent message={`Likes aren't loading right now.`} />
      ) : (
        <>
          <p>&#128077; {isLoading ? "..." : votes}</p>
        </>
      )}
    </div>
  );
}
