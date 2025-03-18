export function pathForArticle(articleID, articleTitle) {
  const urlFriendlyTitle = articleTitle.replaceAll(/[^a-z0-9]/gi, "-");
  return `/articles/${urlFriendlyTitle}-${articleID}`;
}
