import axios from "axios";

const network = axios.create({
  baseURL: "https://nc-news-gjzo.onrender.com/api",
});

export function getArticles(sortBy, order) {
  var sort_by;

  switch (sortBy) {
    case "Date":
      sort_by = "created_at";
      break;
    case "Comments":
      sort_by = "comment_count";
      break;
    case "Votes":
      sort_by = "votes";
      break;
    default:
      sort_by = "created_at";
      break;
  }

  return network
    .get("/articles", {
      params: {
        sort_by,
        order,
      },
    })
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
      if (err.status !== 404) console.log(err);
      throw err;
    });
}

export function incrementArticleVotes(articleId) {
  return network
    .patch(`/articles/${articleId}`, {
      inc_votes: 1,
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

export function getComments(articleId) {
  return network
    .get(`/articles/${articleId}/comments`)
    .then((response) => {
      return response.data.comments.reverse();
    })
    .catch((err) => {
      if (err.status !== 404) console.log(err);
      throw err;
    });
}

export function postComment(article_id, comment, username) {
  return network
    .post(`/articles/${article_id}/comments`, {
      username,
      body: comment,
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

export function deleteComment(comment_id) {
  return network.delete(`/comments/${comment_id}`).catch((err) => {
    console.log(err);
    throw err;
  });
}
