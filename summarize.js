const axios = require("axios");
async function summarizeText(text) {
  let data = JSON.stringify({
    inputs: text,
    parameters: {
      max_length: 200,
      min_length: 30,
    },
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer"+"Access key of huggingface account",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);

    return response.data[0].summary_text;
  } catch (error) {
    console.log(error);
  }
}

module.exports = summarizeText;
