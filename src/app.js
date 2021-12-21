const path = require("path"); //The path module provides utilities for working with file and directory paths
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
//console.log(__dirname); //C:\Users\sgarai\NodeJsProject\web-server\src
//console.log(__filename); //C:\Users\sgarai\NodeJsProject\web-server\src\app.js
const publicDirectoryPath = path.join(__dirname, "../public"); //C:\Users\sgarai\NodeJsProject\web-server\public
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// set up handlebars engine and views location and partials path
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

//serving up the public folder(static asset)
//set up static directory to serve
app.use(express.static(publicDirectoryPath));

//render method allows us to render one of our views ,we have configured express to use ,the view engine hbs.
// 2nd parameter of render allows us pass dynamic values to .hbs(template file) file
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Santanu Garai",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Santanu Garai",
    title: "About Page",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help ",
    helpertext: "this is helper page",
    name: "Santanu Garai",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    //here we put return statement to stop the excuction of remaining code. otherwise remaining code runs
    //then error occurs because then we are sending 2 response for a single request.
    return res.send({
      error: "you must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: error });
      }
      // callback chaining
      forecast(latitude, longitude, (error, forecustData) => {
        if (error) {
          return res.send({ error: error });
        }
        res.send({
          forecast: forecustData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  // res.send({
  //   forcast: "it is showning right now",
  //   loaction: "Kolkata",
  //   address: req.query.address,
  // });
});

//  'help/*' => means any page start with the URL 'help/'
//  '*' => means any page
// this error handeling case we have to write at the end of the file.beacuse express start matching route
// from top to bottom
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Santanu Garai",
    errorMessage: "help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Santanu Garai",
    errorMessage: "page not found",
  });
});

app.listen(port, () => {
  console.log("server is up on " + port);
});

// app.get("", (req, res) => {
//   res.send("hello world");
// });
// app.get("/help", (req, res) => {
//   res.send("help page 44");
// });
// app.get("/about", (req, res) => {
//   res.send("<h1>your about page</h1>");
// });
