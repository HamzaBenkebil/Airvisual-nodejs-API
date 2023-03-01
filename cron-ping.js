const cron = require("node-cron");
var request = require("request");

cron.schedule("* * * * *", async () => {
  var ts;
  var aqius;
  var aqicn;
  var maincn;
  var latitude = 48.8566;
  var longitude = 2.3522;

  const url =
    "http://127.0.0.1:3000/getWeather?latitude=" +
    latitude +
    "&longitude=" +
    longitude;
  const headers = {
    "Content-Type": "application/json",
  };
  var obj;

  try {
    obj = await fetch(
      url,
      { method: "GET", headers: headers },
      function (error, response, body) {
        console.log(response);
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        obj = data;
      })
      .then(() => {
        console.log("obj", obj);
        return obj;
      });
  } catch (error) {
    console.log("error", error);
  }
  try {
    request({
      url: "http://127.0.0.1:3000/postWeather",
      method: "POST",
      json: true, // <--Very important!!!
      body: obj,
    });
  } catch (error) {
    console.log("error=>", error);
  }
});
