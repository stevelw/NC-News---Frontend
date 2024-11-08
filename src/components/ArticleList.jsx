import ArticleCard from "./ArticleCard";
import { getArticles } from "../utils/api";
import { useEffect, useState } from "react";
import ErrorComponent from "./ErrorComponent";
import { useSearchParams } from "react-router-dom";
import Sorting from "./Sorting";

export default function ArticleList({
  topics,
  isTopicsLoading,
  isTopicsError,
  filterTopic,
}) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sortBy, setSortBy] = useState("Date");
  const [isSortDesc, setIsSortDesc] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({
      sort_by: sortBy,
      sort_order: isSortDesc ? "DESC" : "ASC",
    });
    setIsLoading(true);
    setIsError(false);
    getArticles(sortBy, isSortDesc ? "DESC" : "ASC")
      .then((articlesReceived) => {
        setArticles(articlesReceived);
        setIsLoading(false);
      })
      .catch((err) => {
        setArticles([]);
        setIsError(true);
      });
  }, [sortBy, isSortDesc]);

  return (
    <>
      {isError ? (
        <ErrorComponent
          message={
            "Error loading articles. Check your network connection and try again"
          }
        />
      ) : null}
      {isLoading && !isError ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            gridArea: "grid1",
          }}
        >
          <Sorting
            sortBy={sortBy}
            setSortBy={setSortBy}
            isSortDesc={isSortDesc}
            setIsSortDesc={setIsSortDesc}
            options={["Date", "Votes", "Comments"]}
          />
          {articles
            .filter(({ topic }) => {
              return !filterTopic || topic === filterTopic;
            })
            .map((article) => {
              return (
                <ArticleCard
                  key={article.article_id}
                  article={article}
                  topics={topics}
                  isTopicsLoading={isTopicsLoading}
                  isTopicsError={isTopicsError}
                />
              );
            })}
        </div>
      )}
    </>
  );
}
