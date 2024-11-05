import { useEffect, useState } from "react";
import Center from "../styles/Center";
import ArticleList from "./ArticleList";
import Header from "./Header";
import TopicList from "./TopicList";
import Columns_2_1 from "../styles/Columns_2_1";
import LoadButton from "./LoadButton";
import { getLatestArticles } from "../utils/api";

export default function LatestNews() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getLatestArticles()
      .then((articles) => {
        console.log(articles);
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(articles);
        setArticles([]);
        setIsError(true);
      });
  }, []);

  return (
    <>
      <Header />
      <Center>
        <h2>Latest News</h2>
      </Center>
      <Columns_2_1>
        {isError ? (
          <div>
            <p>Error loading articles.</p>
            <p>Check your network connection and try again</p>
          </div>
        ) : null}
        {isLoading && !isError ? (
          <p>Loading...</p>
        ) : (
          <ArticleList articles={articles} />
        )}
        <LoadButton />
        <TopicList />
      </Columns_2_1>
    </>
  );
}
