const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");
const axios = require('axios')
const dotenv = require("dotenv");
const cors = require('cors');

// Explicitly set the path to .env
const result = dotenv.config({ path: path.join(__dirname, ".env") });

if (result.error) {
  console.error("Error loading .env file:", result.error);
} else {
  console.log("Environment variables loaded successfully.");
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OKTA_API_TOKEN = process.env.OKTA_API_TOKENP;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

async function analyzeSentiment(transcript) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a sentiment analysis assistant. Determine if the sentiment of the text is positive, neutral, or negative.",
        },
        {
          role: "user",
          content: `Analyze the sentiment of the following text: "${transcript}"`,
        },
      ],
    });

    const sentiment = response.choices[0].message.content.trim();
    console.log("Sentiment Analysis Result:", sentiment);
    return sentiment;
  } catch (error) {
    console.error("Error during sentiment analysis:", error);
    return "Unable to determine sentiment.";
  }
}

async function determineQuestion(question) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an IT help desk assistant. Categorize the user's question into one of these three options: 'Reset you Okta Authenticators', 'Enroll a device in Okta Verify', or 'Unlock my laptop'. Respond only with the category name.",
        },
        {
          role: "user",
          content: `Please categorize the following question: "${question}"`,
        },
      ],
    });

    const answer = response.choices[0].message.content.trim();
    console.log("Categorized response:", answer);
    return answer;
  } catch (error) {
    console.error("Error during question analysis:", error);
    return "Unable to determine question.";
  }
}

async function resetFactors() {
  axios({
    method: 'post',
    url: `${process.env.OKTA_ORG_URL}/api/v1/users/{user_ID}/lifecycle/reset_factors`,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `SSWS ${OKTA_API_TOKEN}`,
    },
  })
    .then((response) => {
      console.log('Response:', JSON.stringify(response.data, null, 2));
    })
    .catch((error) => {
      if (error.response) {
        console.error('Error Response Data:', JSON.stringify(error.response.data, null, 2));
        console.error('Error Response Status:', error.response.status);
        console.error('Error Response Headers:', JSON.stringify(error.response.headers, null, 2));
      } else {
        console.error('Error Message:', error.message);
      }
    });
}

async function enrollOktaVerify() {
  const url = `${process.env.OKTA_ORG_URL}/api/v1/users/{user_ID}/factors`;
  const data = JSON.stringify({
    factorType: "push",
    provider: "OKTA",
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `SSWS ${OKTA_API_TOKEN}`
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    const qrcodeHref = response.data._embedded?.activation?._links?.qrcode?.href;

    if (!qrcodeHref) {
      throw new Error("QR code link not found in response.");
    }

    return qrcodeHref; // Return the QR code link
  } catch (error) {
    console.error("Error enrolling user in Okta Verify:", error.response ? error.response.data : error.message);
    throw error; // Re-throw the error to be handled by the caller
  }
}
