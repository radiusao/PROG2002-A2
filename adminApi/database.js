const mysql = require('mysql2');
const bodyParser = require('body-parser');
const http = require('http');
const dbDetails = require("./db-details");

module.exports = {
	getconnection: ()=>{
	return mysql.createConnection({
		host:dbDetails.host,
		user:dbDetails.user,
		password:dbDetails.password,
		database:dbDetails.database	
	})}
}