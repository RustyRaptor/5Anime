const express = require("express");
const hbs = require("hbs");
const parseString = require('xml2js').parseString;
const fs = require('fs');
const {MongoClient, ObjectID} = require('mongodb');
const assert = require('assert');

const port = process.env.PORT || 3000;

var obj = new ObjectID();
console.log(obj);

fs.readFile(__dirname + '/anime-titles.xml', function(err, data) {
  parseString(data, function (err, result) {
    // console.dir(JSON.stringify(result));
    console.log('Done');
    var meme = result;
    MongoClient.connect('mongodb://localhost:27017/5Anime', (err, db) => {
      if (err) {
        return console.log('unable to connect to mongodb server');
      }
      console.log('connected to mongodb server');

      db.collection('test').insertMany(
        [

        ]
      ).then((result) => {
        console.log(result);
      })
  })
  });
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
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to 5Anime. Home of the Otaku",
    newAnime: "Fairy Tail",
    newAnimeDesc: "Set in an imaginary world, the Earth Land, there exists a"
    + " Mage Guild called 'Fairy Tail'. Fairy Tail is stationed in the town"
    + " Magnolia, residing in the Kingdom of Fiore, and is currently governed by"
    + " Makarov, Guild's master. Lucy Heartfilia, a 17-year-old girl, wishes to"
    + " become a full-fledged mage and join one of the most prestigious Mage"
    + " Guilds in the world, Fairy Tail. One day, out of pure coincidence, she"
    + " meets Natsu Dragneel, a boy who is transportation-sick, but very"
    + " cheerful in nature. However, the thing she does not know is that Natsu"
    + " is the closest connection to Fairy Tail, as he is a Mage in Fairy Tail."
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
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
