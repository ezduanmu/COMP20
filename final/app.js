const express = require("express");
const app = express();
//const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const fs = require("fs");
//const mustache = require("mustache");
const jsdom = require("jsdom");
const cheerio = require("cheerio");
const htmlparser2 = require("htmlparser2");
const dom = htmlparser2.parseDOM("leaderboard.html");
const $ = cheerio.load(dom);

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dlee07:comp20@scores-qpnhf.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



client.connect(err => {
	console.log("Connected");
	const collection = client.db("scores").collection("game");
	var users = [];
	collection.find({}).toArray(function(err, result) {
		users = result;
		console.log(result);
		console.log(users);
		users.sort(function (a, b) {
			return b.score - a.score;
		});
		console.log(users);
		let handleRequest = (request, response) => {
			fs.readFile('./leaderboard.html', null, function(error, users) {
				$('#leaderlist', '#firstUser').text(users[0][1]);
				$('#leaderlist', '#firstScore').text(users[0][2]);
				$.root().html();
				console.log("Complete");
				response.end();
			});
		};
		http.createServer(handleRequest).listen('./leaderboard.html');
	}); 
    client.close();
});










//ab71dde2-04bf-4296-84bd-a7d1705daf07