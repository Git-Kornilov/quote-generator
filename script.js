"use strict";
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const apiURL = "https://type.fit/api/quotes";
let apiQuotes = [];

const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const complete = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

const randomNumber = () => Math.floor(Math.random() * apiQuotes.length);

const newQuote = () => {
  loading();

  const quote = apiQuotes[randomNumber()];

  authorText.textContent = quote.author ? quote.author : "Unknown";

  if (quote.text > 100) quoteText.classList.add("long-quote ");
  if (quote.text < 100) quoteText.classList.remove("long-quote ");

  quoteText.textContent = quote.text;

  complete();
};

const getQuotes = async function () {
  loading();

  try {
    const resp = await fetch(apiURL);
    apiQuotes = await resp.json();

    newQuote();
  } catch (err) {
    alert(err);
  }
};

getQuotes();

const tweetQuote = () => {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent} `;

  window.open(twitterURL, "_blank");
};

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
