import Center from "../styles/Center";
import ArticleList from "./ArticleList";
import HeaderElement from "./HeaderElement";
import TopicList from "./TopicList";
import Columns_2_1 from "../styles/Columns_2_1";
import LoadButton from "./LoadButton";

export default function LatestNews({ topics }) {
  return (
    <>
      <HeaderElement />
      <Center>
        <h2>Latest News</h2>
      </Center>
      <Columns_2_1>
        <ArticleList topics={topics} />
        <LoadButton />
        <TopicList />
      </Columns_2_1>
    </>
  );
}
