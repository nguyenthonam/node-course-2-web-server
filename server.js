const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  res.render("maintenance.hbs");
});

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return String(text).toUpperCase();
});

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append to server.log");
    }
  });
  next();
});

app.get("/", (req, res) => {
  //   res.send("Hello Express!");
  // res.send({
  //   name: "Nam",
  //   likes: ["Biking", "Cities"]
  // });

  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to my website ^^."
    // currentYear: new Date().getFullYear(),
  });
});

app.get("/about", (req, res) => {
  // res.send("About Page!");
  res.render("about.hbs", {
    pageTitle: "About Page"
    // currentYear: new Date().getFullYear()
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to handle request!"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000!");
});
