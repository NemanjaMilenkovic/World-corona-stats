import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "../style/news.css";
require("dotenv").config();
export default function News() {
  const [coronaNews, setCoronaNews] = useState([]);
  useEffect(() => {
    (async function() {
      const newsData = await axios({
        method: "GET",
        url:
          "https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/search",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host":
            "microsoft-azure-bing-news-search-v1.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_API_NEWS_KEY
        },
        params: {
          q: "corona virus"
        }
      })
        .then(response => {
          console.log(response);
          //push ones with image to array
          setCoronaNews(response.data.value.filter(obj => obj.image));
        })
        .catch(error => {
          console.log(error);
        });
    })();
  }, []);
  console.log(coronaNews);
  return (
    <div className="corona-news">
      {coronaNews.map((news, idx) => {
        return (
          <Card
            style={{ border: "1px solid black" }}
            className="news-card"
            key={idx}
          >
            <Card.Body>
              <Card.Title>{news.name}</Card.Title>
              <Card.Text>{news.description}</Card.Text>
            </Card.Body>
            <Card.Link href={news.url}>Check the news</Card.Link>
          </Card>
        );
      })}
    </div>
  );
}
