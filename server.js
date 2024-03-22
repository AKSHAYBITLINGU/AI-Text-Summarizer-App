const express = require("express");
const app = express();
const port = 3002;
const summarize = require("./summarize.js");

app.use(express.json());

app.use(express.static("public"));

app.post("/summarize", (req, res) => {
  const text = req.body.text_to_summarize;

  return summarize(text)
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      console.error(error.message);
    });
});

app.listen(port, () => {
  console.log("server listening at port", port);
});
