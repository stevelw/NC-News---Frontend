# Northcoders News - Frontend

**An example frontend for a social news site.**

A _'production'_ version is hosted at [nc-news2024.netlify.app](http://nc-news2024.netlify.app).

When the backend server is not in use, it is spun down, so you may see loading messages. You will need to refresh the browser to get the first load to succeed in that instance, which can take up to a minute. This only affects the first load and only if the example server has been spun down.

You can check the health of the backend server by going to [nc-news-gjzo.onrender.com/api](https://nc-news-gjzo.onrender.com/api) in a web browser and checking if a JSON object is rendered. Likewise, you can check the health of the backend database server by going to [nc-news-gjzo.onrender.com/api/articles](https://nc-news-gjzo.onrender.com/api/articles).

I built this as a portfolio project while on the _[Northcoders](https://northcoders.com) JavaScript full-stack course_. All code is my own.

- The runtime environment is **browser-based**
- The framework is _React_
- Network calls use _Axios_
- Routing uses _React Router DOM_
- Building uses _Vite_/_CodeKit_

## How to run and test locally

1. Clone the repo from [github.com/stevelw/fe-nc-news.git](https://github.com/stevelw/fe-nc-news.git)

   `git clone https://github.com/stevelw/fe-nc-news.git`

2. Install the development dependencies

   `npm install -d`

3. Launch the local server

   `npm run dev`
