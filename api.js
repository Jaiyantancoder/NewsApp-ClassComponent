import React,{Component} from "react";
import { NEWS_API_KEY } from "./config";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import { Category } from "@material-ui/icons";


export const getNewsBySrc = async slicedsrclow => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?sources=${slicedsrclow}&apiKey=${NEWS_API_KEY}`
  );
  const json = await response.json();
  return json;
};

export const getNewsByCat = async catfilter => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${catfilter}&apiKey=${NEWS_API_KEY}`
  );
  const json = await response.json();
  return json;
};

export const getNewsByTerm = async slicedtermlow => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${slicedtermlow}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
    );
    const json = await response.json();
    return json;
  };

export const getNewsHeadlines = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
    );
    const json = await response.json();
    return json;
  }; 