//server.js
const express = require("express");
const moment = require("moment");
//const fetch  = require("node-fetch")
const axios = require('axios').default;
const app = express();

//LOGGER
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }: ${moment().format()}`
  );
  next();
};

app.use(logger);

app.get("/", (req, res) => {
  res.send("Server OK");
});

app.get('/weather', async (request, response) => {
        const api_URL =`https://api.waqi.info/feed/tokyo/?token=999ab7e8c4b9696588efeb00c223db260c677a4d`
        const fetch_response = await axios.get(api_URL)
        console.log(fetch_response.data);
        response.json(fetch_response.data);
        //const json = await fetch_response.json()
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
