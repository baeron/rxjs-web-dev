var express = require("express");
var app = express();

let counter = 0;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function(req, res) {
  res.send("Hello RxJS Retry operator!");
});

app.get("/list-data", function(req, res) {
	console.log('count ', counter);

	if(counter ++ < 3) {
		res.status(404).send({
			message: 'Page not found!'
		});
		return;
	}

	counter = 0;
	res.status(200).send({
		success: true,
		data: "Some data from Back End"
	})
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
