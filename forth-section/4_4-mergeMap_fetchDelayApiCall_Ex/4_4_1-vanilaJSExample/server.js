var express = require("express");
var app = express();

let counter = 0;
const responseReady = {};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.get("/request-data", function(req, res) {
	const requestAnswer = {dataId: counter++};
	setTimeout(() => {
		responseReady[requestAnswer.dataId] = true;
	}, 3000);
	res.status(200).send(requestAnswer);
});

app.get('/get-response', function(req, res) {
	const dataId = req.query.dataId;
	const notReadyAnswer = {ready: false};
	const readyAnswer = {data: [1, 2, 3, 4, 5],ready: true};

	if(!responseReady[dataId]) {
		console.log('Not ready...');
		res.status(200).send(notReadyAnswer);
	} else {
		console.log('Ready!');
		res.status(200).send(readyAnswer);
	}
})

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
