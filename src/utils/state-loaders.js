import { getTopics } from "./api";

export function loadTopicsState(
  setTopicsFn,
  setIsTopicsLoadingFn,
  setIsTopicsErrorFn
) {
  setIsTopicsLoadingFn(true);
  setIsTopicsErrorFn(false);
  getTopics()
    .then((topicsList) => {
      const topicsLookup = {};
      topicsList.forEach(({ slug, description }) => {
        topicsLookup[slug] = description;
      });
      setTopicsFn(topicsLookup);
      setIsTopicsLoadingFn(false);
    })
    .catch(() => {
      setTopicsFn({});
      setIsTopicsErrorFn(true);
    });
}
