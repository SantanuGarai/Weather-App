const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=3d68dca8f6051c0fb3f87ad0beb85051&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    "&units=m";
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". it is currently " +
          body.current.temperature +
          " degree out there. but it feels like " +
          body.current.feelslike + " degress out. The humidity is " + body.current.humidity +"%."
      );
    }
  });
};
module.exports = forecast;

// const url =
//   "http://api.weatherstack.com/current?access_key=3d68dca8f6051c0fb3f87ad0beb85051&query=22.572645,88.363892&units=m";
// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log("unable to connect to weather service");
//   } else if (response.body.error) {
//     console.log("Unable to find location!");
//   } else {
//     console.log(
//       response.body.current.weather_descriptions[0] +
//         ". it is currently " +
//         response.body.current.temperature +
//         " degree out there . but it feels like " +
//         response.body.current.feelslike
//     );
//   }
// });
