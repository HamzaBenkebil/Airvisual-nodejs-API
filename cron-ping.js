const cron = require("node-cron");
var request = require("request");

cron.schedule("* * * * *", async () => {
  /*  this cron is runing every minute */
  //lon and lat for paris area
  var latitude = 48.8566;
  var longitude = 2.3522;

  const url = // we call getWeather api to get object data that we have to save into our data base
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
        obj = data; // we make the result of the fetch into this object named obj
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
      body: obj, // and here we go with the insertion into the body request :)
    });
  } catch (error) {
    console.log("error", error);
  }
});
