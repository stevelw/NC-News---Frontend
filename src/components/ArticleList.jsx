import ArticleCard from "./ArticleCard";
import { getArticles } from "../utils/api";
import { useEffect, useState } from "react";
import ErrorComponent from "./ErrorComponent";
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
  const [sortBy, setSortBy] = useState("author");

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getArticles()
      .then((articlesReceived) => {
        setArticles(articlesReceived);
        setIsLoading(false);
      })
      .catch((err) => {
        setArticles([]);
        setIsError(true);
      });
  }, []);

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
          <Sorting sortBy={sortBy} setSortBy={setSortBy} options={["Date"]} />
          {articles
            .filter(({ topic }) => {
              return !filterTopic || topic === filterTopic;
            })
            .map(({ article_id, title, topic, article_img_url }) => {
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
                  </div>
                  <img style={childStyle} src={article_img_url} alt="" />
                </ArticleCard>
              );
            })}
        </div>
      )}
    </>
  );
}
