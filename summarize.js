// const axios = require("axios");
// async function summarizeText(text) {
//   let data = JSON.stringify({
//     inputs: text,
//     parameters: {
//       max_length: 200,
//       min_length: 30,
//     },
//   });

//   let config = {
//     method: "post",
//     maxBodyLength: Infinity,
//     url: "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer"+"Access key of huggingface account",
//     },
//     data: data,
//   };

//   try {
//     const response = await axios.request(config);

//     return response.data[0].summary_text;
//   } catch (error) {
//     console.log(error);
//   }
// }

// module.exports = summarizeText;

const axios = require("axios");

async function summarizeText(text) {
  const data = JSON.stringify({
    inputs: text,
  });

  const config = {
    method: "post",
    url: "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer ${process.env.HF_ACCESS_TOKEN}", 
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data[0]["summary_text"];
  } catch (error) {
    console.error(
      "Error summarizing text:",
      error?.response?.data || error.message
    );
    throw error;
  }
}

module.exports = summarizeText;

