const dbcon = require("../database");
const express = require('express');
const router = express.Router();
const connection = dbcon.getconnection();

connection.connect();

//shows all fundraiser data
router.get("/", (req, res)=>{
	connection.query("SELECT FUNDRAISER_ID AS ID, ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, `ACTIVE`, CATEGORY.NAME AS CATEGORY FROM FUNDRAISER INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID", (err, records)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})
//shows all ACTIVE fundraiser data
router.get("/active", (req, res)=>{
	connection.query("SELECT FUNDRAISER_ID AS ID, ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, `ACTIVE`, CATEGORY.NAME AS CATEGORY FROM FUNDRAISER INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID WHERE `ACTIVE` = 1", (err, records)=> {
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
	connection.query("SELECT FUNDRAISER_ID AS ID, ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, `ACTIVE`, CATEGORY.NAME AS CATEGORY FROM FUNDRAISER INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID WHERE FUNDRAISER_ID=" + req.params.id, (err, records)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})
//shows search request for ORGANIZER
router.get("/search/:id", (req, res)=>{
	connection.query("SELECT FUNDRAISER_ID AS ID, ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, `ACTIVE`, CATEGORY.NAME AS CATEGORY FROM FUNDRAISER INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID WHERE ORGANIZER LIKE"+ "'" + "%" + req.params.id + "%" + "'" + " ORDER BY ORGANIZER", (err, records)=> {
		 if (err){
			 console.error("Error while retrieve the data ");
		 }else{
			 res.send(records);
		 }
	})
})
//shows search request for ORGANIZER that is still active
router.get("/search-active/:id", (req, res)=>{
	connection.query("SELECT FUNDRAISER_ID AS ID, ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, `ACTIVE`, CATEGORY.NAME AS CATEGORY FROM FUNDRAISER INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID WHERE ORGANIZER LIKE" + "'" + "%" + req.params.id + "%" + "'" + 'AND ACTIVE = 1' + " ORDER BY ORGANIZER", (err, records)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})
//shows search request by CAPTION
router.get("/search-caption/:id", (req, res)=>{
	connection.query("SELECT FUNDRAISER_ID AS ID, ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, `ACTIVE`, CATEGORY.NAME AS CATEGORY FROM FUNDRAISER INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID WHERE CAPTION LIKE" + "'" + "%" + req.params.id + "%" + "'" + " ORDER BY CAPTION", (err, records)=> {
		 if (err){
			 console.error("Error while retrieve the data ");
		 }else{
			 res.send(records);
		 }
	})
})
//shows search request by CAPTION that is still active
router.get("/search-active-caption/:id", (req, res)=>{
	connection.query("SELECT FUNDRAISER_ID AS ID, ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, `ACTIVE`, CATEGORY.NAME AS CATEGORY FROM FUNDRAISER INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID WHERE CAPTION LIKE" + "'" + "%" + req.params.id + "%" + "'" + 'AND ACTIVE = 1' + " ORDER BY CAPTION", (err, records)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})
})
module.exports = router;