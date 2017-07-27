const express = require("express");
const hbs = require("hbs");
const parseString = require('xml2js').parseString;
const fs = require('fs');

var xml = "<root>Hello xml2js!</root>"
parseString(xml, function(err, result) {
  console.dir(result);
});


var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  res.render("test.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to my website"
  });
});

// app.get("/accelworld", (req, res) => {
//   res.render("details.hbs", {
//     animetitle: "Accel World",
//     animecoverjpg: "../../../images/accelworldcover.jpg",
//     animedesc: "The year is 2046. Haruyuki Arita is a young boy who finds himse" +
//       "lf on the lowest social rungs of his school. Ashamed of his miserable life," +
//       "Haruyuki can only cope by indulging in virtual games. But that all changes" +
//       "when Kuroyukihime, the most popular girl in school, introduces him to a m" +
//       "ysterious program called Brain Burst and a virtual reality called the Acc" +
//       "el World.",
//     episodecount: "24",
//     genres: "Action, Game, Romance, School, Sci-Fi, Shounen",
//     releasedate: "2012",
//     styleSheet: "/variables.css"
//   });
// });


// /bad - send back json with errorMessage
app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to handle request"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
