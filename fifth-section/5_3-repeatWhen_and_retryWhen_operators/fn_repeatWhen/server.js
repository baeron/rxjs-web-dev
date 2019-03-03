var express = require("express");
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function(req, res) {
  res.send("Hello RxJS!");
});
counter = 3;
let data = [1,2];
/* Main routes */
app.get('/list-data', function(req, res) {

    data = data.concat([counter++]);
    if (data.length > 10) { data = [1,2]; counter = 3;};

    res.status(200).send({
        success: true,
        data: data
    });

});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
