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

let value = 6;

app.get("/list-data", function(req, res) {
  console.log("Page: ", req.query.page);

  let nextIndex;
  let pageIndex = +req.query.page;

  value = pageIndex * 5 + 1;

  if (req.query.page < 3) {
    nextIndex = pageIndex + 1;
    // for check input in browser string http://localhost:3001/list-data?page=0
    res.status(200).send({
      nextIndex,
      data: [value++, value++, value++, value++, value++]
    });
  } else {
    res.status(200).send({
      data: [value++, value++, value++, value++, value++]
    });
  }
});

app.listen(3001, function() {
  console.log("Example app listening on port 3001!");
});
