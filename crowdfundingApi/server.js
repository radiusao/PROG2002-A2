const express = require('express');
const app = express()
const crowdfundingApi = require("./controllerApi/api-controller");
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:8080' }));

app.use("/api/fundraiser", crowdfundingApi);
app.listen(3060);
console.log("Server up and running on port 3060");