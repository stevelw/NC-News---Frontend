import { useState } from "react";
import Center from "../styles/Center";
import ArticleList from "./ArticleList";
import Header from "./Header";
import TopicList from "./TopicList";

export default function LatestNews() {
  const [articles, setArticles] = useState([1, 2, 3]);
  return (
    <>
      <Header />
      <Center>
        <h2>Latest News</h2>
      </Center>
      <ArticleList articles={articles} />
      <Center>
        <button>Loan more...</button>
      </Center>
      <TopicList />
    </>
  );
}
