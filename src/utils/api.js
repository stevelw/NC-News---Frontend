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
