const dbcon = require("../database");
const express = require('express');
const router = express.Router();
const connection = dbcon.getconnection();
connection.connect();

//adding new fundraiser
router.post("/add", (req, res)=>{
	let organiser = req.body.organiser;
	let caption = req.body.caption;
	let target = req.body.target;
    let city = req.body.city;
    let category = req.body.category;
	connection.query(`INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES ('${organiser}', '${caption}', ${target}, 0, '${city}', 1, '${category}');`, 
	(err, result)=> {
		 if (err){
			 console.error("Error while retrieve the data" + err);
             res.send('error' + err)
		 }else{
			 res.send({insert:"success"});
		 }
	})
})


//updating current fundraiser
router.put("/change", (req, res)=>{
    let id = req.body.id;
	let organiser = req.body.organiser;
	let caption = req.body.caption;
	let target = req.body.target;
    let currentFund = req.body.currentFund;
    let city = req.body.city;
    let active = req.body.active;
    let category = req.body.category;
	connection.query(`UPDATE FUNDRAISER SET ORGANIZER = '${organiser}', CAPTION  = '${caption}', TARGET_FUNDING  = ${target}, CURRENT_FUNDING  = ${currentFund}, CITY  = '${city}', ACTIVE  = ${active}, CATEGORY_ID  = '${category}' WHERE FUNDRAISER_ID = ${id}`, 
	(err, result)=> {
		 if (err){
			 console.error("Error while Updating the data" + err);
             res.send('error' + err)
		 }else{
			 res.send({update:"success"});
		 }
	})
})

//deleting fundraiser (only with $0 current funding)
router.delete("/delete/:id", (req, res)=>{
	connection.query(`DELETE FROM FUNDRAISER WHERE FUNDRAISER_ID = ${req.params.id} AND CURRENT_FUNDING = 0`, (err, records,fields)=> {
		 if (err){
			 console.error("Error while deleting the data");
             res.send('error' + err)
		 }else{
			 res.send({delete:"Delete Sucess"});
		 }
	})
})

module.exports = router;