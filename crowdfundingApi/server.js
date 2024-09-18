const express = require('express');
const app = express()
const crowdfundingApi = require("./controllerAPI/api-controller");


app.use("/api/crowdfunding", crowdfundingApi);
app.listen(3060);
console.log("Server up and running on port 3060");