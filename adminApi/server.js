const express = require('express');
const app = express()
const crowdfundingApi = require("./controllerApi/api-controller");
const cors = require('cors');
const bodyparser = require('body-parser');

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use("/api/admin", crowdfundingApi);
app.listen(3000);
console.log("Server up and running on port 3000");