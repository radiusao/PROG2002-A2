const dbcon = require("../database");
const express = require('express');
const router = express.Router();
const connection = dbcon.getconnection();
connection.connect();

//shows all fundraiser data
router.get("/", (req, res)=>{
	connection.query("SELECT FUNDRAISER_ID AS ID, ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, `ACTIVE`, LAST_UPDATED, CATEGORY.NAME AS CATEGORY FROM FUNDRAISER INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID ORDER BY LAST_UPDATED DESC;", (err, records)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})
//shows all ACTIVE fundraiser data
router.get("/active", (req, res)=>{
	connection.query("SELECT FUNDRAISER_ID AS ID, ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, `ACTIVE`, LAST_UPDATED, CATEGORY.NAME AS CATEGORY FROM FUNDRAISER INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID WHERE `ACTIVE` = 1 ORDER BY LAST_UPDATED DESC", (err, records)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})
//shows all donation activities shorted by latest
router.get("/latest", (req, res)=>{
	connection.query("SELECT DONATION.`DATE`, FUNDRAISER.FUNDRAISER_ID AS ID, FUNDRAISER.ORGANIZER, FUNDRAISER.CAPTION, FUNDRAISER.TARGET_FUNDING, FUNDRAISER.CURRENT_FUNDING, FUNDRAISER.CITY, FUNDRAISER.`ACTIVE`, CATEGORY.NAME AS CATEGORY FROM DONATION INNER JOIN FUNDRAISER ON DONATION.FUNDRAISER_ID = FUNDRAISER.FUNDRAISER_ID INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID ORDER BY `DATE` DESC;", (err, records)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})
//shows category
router.get("/category", (req, res)=>{
	connection.query("SELECT * FROM CATEGORY", (err, records)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})
//shows category active count
router.get("/category/:id", (req, res)=>{
	connection.query("SELECT FUNDRAISER_ID AS ID, CATEGORY.CATEGORY_ID AS NAME, COUNT(CATEGORY.NAME) AS ACTIVE FROM CATEGORY RIGHT JOIN FUNDRAISER ON CATEGORY.CATEGORY_ID = FUNDRAISER.CATEGORY_ID WHERE CATEGORY.CATEGORY_ID=" +`'${req.params.id}'`, (err, records)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})
//shows the result by id
router.get("/:id", (req, res)=>{
	connection.query("SELECT FUNDRAISER_ID AS ID, ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, `ACTIVE`, LAST_UPDATED, CATEGORY.NAME AS CATEGORY FROM FUNDRAISER INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID WHERE FUNDRAISER_ID=" + req.params.id, (err, records)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})
//shows search request for ORGANIZER
router.get("/search/:id", (req, res)=>{
	connection.query("SELECT FUNDRAISER_ID AS ID, ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, `ACTIVE`, LAST_UPDATED, CATEGORY.NAME AS CATEGORY FROM FUNDRAISER INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID WHERE ORGANIZER LIKE"+ "'" + "%" + req.params.id + "%" + "'" + " ORDER BY ORGANIZER", (err, records)=> {
		 if (err){
			 console.error("Error while retrieve the data ");
		 }else{
			 res.send(records);
		 }
	})
})
//shows search request for ORGANIZER that is still active
router.get("/search-active/:id", (req, res)=>{
	connection.query("SELECT FUNDRAISER_ID AS ID, ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, `ACTIVE`, LAST_UPDATED, CATEGORY.NAME AS CATEGORY FROM FUNDRAISER INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID WHERE ORGANIZER LIKE" + "'" + "%" + req.params.id + "%" + "'" + 'AND ACTIVE = 1' + " ORDER BY ORGANIZER", (err, records)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})
//shows search request by CAPTION
router.get("/search-caption/:id", (req, res)=>{
	connection.query("SELECT FUNDRAISER_ID AS ID, ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, `ACTIVE`, LAST_UPDATED, CATEGORY.NAME AS CATEGORY FROM FUNDRAISER INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID WHERE CAPTION LIKE" + "'" + "%" + req.params.id + "%" + "'" + " ORDER BY CAPTION", (err, records)=> {
		 if (err){
			 console.error("Error while retrieve the data ");
		 }else{
			 res.send(records);
		 }
	})
})
//shows search request by CAPTION that is still active
router.get("/search-active-caption/:id", (req, res)=>{
	connection.query("SELECT FUNDRAISER_ID AS ID, ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, `ACTIVE`, LAST_UPDATED, CATEGORY.NAME AS CATEGORY FROM FUNDRAISER INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID WHERE CAPTION LIKE" + "'" + "%" + req.params.id + "%" + "'" + 'AND ACTIVE = 1' + " ORDER BY CAPTION", (err, records)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})
router.post("/donate", (req, res)=>{
	let amount = req.body.amount;
	let giver = req.body.giver;
	let fundraiserID = req.body.fundraiserID;
	connection.query(`INSERT INTO DONATION (AMOUNT, GIVER, FUNDRAISER_ID) VALUES(${amount}, "${giver}", ${fundraiserID})`,  
	(err, result)=> {
		 if (err){
			 console.error("Error while retrieve the data" + err);
		 }else{
			 res.send({insert:"success"});
			 
			connection.query(`UPDATE FUNDRAISER SET LAST_UPDATED = "${new Date().toISOString().slice(0, 19).replace('T', ' ')}" WHERE FUNDRAISER_ID = ${fundraiserID}`) //update the fundraiser latest time updated
			connection.query(`UPDATE FUNDRAISER SET CURRENT_FUNDING = CURRENT_FUNDING + ${amount} WHERE FUNDRAISER_ID = ${fundraiserID}`)
		 }
	})
})


module.exports = router;