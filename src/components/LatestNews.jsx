import ArticleList from "./ArticleList";
import HeaderElement from "./HeaderElement";
import TopicList from "./TopicList";

export default function LatestNews() {
  return (
    <>
      <HeaderElement />
      <h2 className="heading heading--center">Latest News</h2>
      <div className="latest-news-grid">
        <ArticleList />
        <TopicList />
      </div>
    </>
  );
}
