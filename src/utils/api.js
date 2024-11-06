import axios from "axios";

const network = axios.create({
  baseURL: "https://nc-news-gjzo.onrender.com/api",
});

export function getLatestArticles() {
  return network
    .get("/articles")
    .then((response) => {
      return response.data.articles;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

export function getTopics() {
  return network
    .get("/topics")
    .then((response) => {
      return response.data.topics;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

export function getArticle(articleId) {
  return network
    .get(`/articles/${articleId}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

export function getComments(articleId) {
  return Promise.resolve([
    {
      comment_id: 9,
      votes: 0,
      created_at: "2020-01-01T03:08:00.000Z",
      author: "icellusedkars",
      body: "Superficially charming",
      article_id: 1,
    },
    {
      comment_id: 4,
      votes: -100,
      created_at: "2020-02-23T12:01:00.000Z",
      author: "icellusedkars",
      body: " I carry a log — yes. Is it funny to you? It is not to me.",
      article_id: 1,
    },
    {
      comment_id: 3,
      votes: 100,
      created_at: "2020-03-01T01:13:00.000Z",
      author: "icellusedkars",
      body: "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
      article_id: 1,
    },
  ]);
}
