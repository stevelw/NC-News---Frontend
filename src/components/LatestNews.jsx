import { useState } from "react";
import Center from "../styles/Center";
import ArticleList from "./ArticleList";
import Header from "./Header";
import TopicList from "./TopicList";
import Columns_2_1 from "../styles/Columns_2_1";
import LoadButton from "./LoadButton";

export default function LatestNews() {
  const [articles, setArticles] = useState([1, 2, 3]);
  return (
    <>
      <Header />
      <Center>
        <h2>Latest News</h2>
      </Center>
      <Columns_2_1>
        <ArticleList articles={articles} />
        <LoadButton />
        <TopicList />
      </Columns_2_1>
    </>
  );
}
