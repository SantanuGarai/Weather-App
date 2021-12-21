const request = require("request");
// const geocodeURL =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2FudGFudWdhcmFpIiwiYSI6ImNreDc3MzNybTI0MHkyeXBhY3VoMW5iMXAifQ.ju7yxwBzrbJ-exeY0zN_lA&limit=1";
// request({ url: geocodeURL, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect Geocoding service");
//   } else if (response.body.features.length === 0) {
//     // if we does not type correct value of location(which exist) like if loaction = 2652.. then features array stays black.
//     console.log("Unable to find location!");
//   } else {
//     const latitude = response.body.features[0].center[1];
//     const longitude = response.body.features[0].center[0];
//     console.log(latitude, longitude);
//   }
// });

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) + //if address contain some special character(like-?,&) which has some meaning in URL, then this function will encode that.
    ".json?access_token=pk.eyJ1Ijoic2FudGFudWdhcmFpIiwiYSI6ImNreDc3MzNybTI0MHkyeXBhY3VoMW5iMXAifQ.ju7yxwBzrbJ-exeY0zN_lA&limit=1";
  //here the request is Asynchronous method, so it will excuted after main function.
  //so whatever we need to return using this function, we need pass that as a pamameter in callback function.
  // see the viedo no. 35(the callback function) to know more about it.
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect Geocoding service", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find location ! try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
