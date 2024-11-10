import ArticleList from "./ArticleList";
import HeaderElement from "./HeaderElement";
import TopicList from "./TopicList";
import Columns_2_1 from "../styles/Columns_2_1";

export default function LatestNews({ topics, isTopicsLoading, isTopicsError }) {
  return (
    <>
      <HeaderElement />
      <h2 className="heading heading--center">Latest News</h2>
      <Columns_2_1>
        <ArticleList
          topics={topics}
          isTopicsLoading={isTopicsLoading}
          isTopicsError={isTopicsError}
        />
        <TopicList
          topics={topics}
          isTopicsLoading={isTopicsLoading}
          isTopicsError={isTopicsError}
        />
      </Columns_2_1>
    </>
  );
}
