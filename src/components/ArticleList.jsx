import ArticleCard from "./ArticleCard";
import { getArticles } from "../utils/api";
import { useEffect, useState } from "react";
import ErrorComponent from "./ErrorComponent";
import { Link, useSearchParams } from "react-router-dom";
import Sorting from "./Sorting";

export default function ArticleList({
  topics,
  isTopicsLoading,
  isTopicsError,
  filterTopic,
}) {
  const childStyle = {
    maxWidth: "45%",
  };

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sortBy, setSortBy] = useState("Date");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ sort_by: sortBy });
    setIsLoading(true);
    setIsError(false);
    getArticles();
    getArticles(sortBy)
      .then((articlesReceived) => {
        setArticles(articlesReceived);
        setIsLoading(false);
      })
      .catch((err) => {
        setArticles([]);
        setIsError(true);
      });
  }, [sortBy]);

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
            options={["Date", "Comments"]}
          />
          {articles
            .filter(({ topic }) => {
              return !filterTopic || topic === filterTopic;
            })
            .map(
              ({
                article_id,
                title,
                topic,
                article_img_url,
                created_at,
                comment_count,
                votes,
              }) => {
                const urlFriendlyTitle = title.replaceAll(/[^a-z]/gi, "-");
                const articleUrl =
                  "/articles/" + urlFriendlyTitle + "-" + article_id;
                return (
                  <ArticleCard key={article_id}>
                    <div style={childStyle}>
                      <Link to={articleUrl}>
                        <h3>{title}</h3>
                      </Link>
                      {isTopicsError || isTopicsLoading ? (
                        <p>{topic}</p>
                      ) : (
                        <Link to={"/topics/" + topic}>
                          <p>{topics[topic]}</p>
                        </Link>
                      )}
                      <p>{new Date(created_at).toDateString()}</p>
                      <p>
                        {comment_count} comment{comment_count > 1 && "s"}
                      </p>
                      <p>&#128077; {votes}</p>
                    </div>
                    <img style={childStyle} src={article_img_url} alt="" />
                  </ArticleCard>
                );
              }
            )}
        </div>
      )}
    </>
  );
}
