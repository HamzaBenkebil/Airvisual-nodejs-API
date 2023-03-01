const express = require("express");
var bodyParser = require("body-parser");
var cron = require("./cron-ping"); // call cron
var mysql = require("mysql");
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/getWeather", async (req, res) => {
  var longitude = req.query.longitude;
  var latitude = req.query.latitude;
  const url =
    "http://api.airvisual.com/v2/nearest_city?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&key=b85e2d85-4282-4712-85e3-1abd36a1904d";
  const headers = {
    "Content-Type": "application/json",
  };
  var obj;
  obj = await fetch(url, { method: "GET", headers: headers })
    .then((res) => res.json())
    .then((data) => {
      obj = data;
    })
    .then(() => {
      return obj.data.current.pollution;
    });
  if (obj) {
    return res.json(obj);
  } else {
    res.json(obj);
  }
});

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "weatherdb",
});

connection.connect();
app.post("/postWeather", async (req, res) => {
  var ts = req.body.ts;
  var aqius = req.body.aqius;
  var aqicn = req.body.aqicn;
  var maincn = req.body.maincn;
  var mainus = req.body.mainus;
  connection.query(
    "INSERT INTO `Weather` (ts , aqius , aqicn , maincn , mainus ) VALUES (?,?,?,?,?)",
    [
      ts.toString(),
      aqius.toString(),
      aqicn.toString(),
      maincn.toString(),
      mainus.toString(),
    ],
    function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    }
  );
});
const headers = {
  "Content-Type": "application/json",
};

// PORT
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
