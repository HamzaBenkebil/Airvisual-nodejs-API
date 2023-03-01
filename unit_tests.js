const request = require("supertest");
const describe = require("describe");
const app = require("./index.js");

describe("GET /", function () {
  it("test response of get method", function (done) {
    request(app)
      .get("/getWeather?longitude=-1.318004&latitude=34.888406")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(
        {
          ts: "2023-03-01T18:00:00.000Z",
          aqius: 13,
          mainus: "p2",
          aqicn: 4,
          maincn: "p2",
        },
        done
      );
  });
});
