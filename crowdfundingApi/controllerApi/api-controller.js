const dbcon = require("../database");
const express = require('express');
const router = express.Router();
const connection = dbcon.getconnection();

connection.connect();

router.get("/", (req, res)=>{
	connection.query("select * from FUNDRAISER", (err, records,fields)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})
module.exports = router;