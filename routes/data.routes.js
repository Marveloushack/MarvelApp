const express = require("express");
const router = express.Router();
const api = require("marvel-api");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

const marvel = api.createClient({
  publicKey: process.env.PBK,
  privateKey: process.env.PVK,
});

router.get("/search", (req, res) => res.render("data/search"));
router.get("/details/:id", (req, res) => {
  const charPromise = marvel.characters.find(req.params.id);
  const comicsPromise = marvel.characters.comics(req.params.id, (limit = 50));
  const eventsPromise = marvel.characters.events(req.params.id, (limit = 50));
  const storiesPromise = marvel.characters.series(req.params.id, (limit = 50));
  Promise.all([charPromise, comicsPromise, eventsPromise, storiesPromise])
    .then((results) => {
      res.render("data/details", {
        character: results[0].data,
        comics: results[1].data,
        events: results[2].data,
        series: results[3].data,
      });
    })
    .catch((err) => console.log("Error al mostrar detalles ", err));
});

router.get("/recommend", (req, res) => res.render("data/recommend"));
router.get("/recommend/characters", ensureLoggedIn(), (req, res) => {
  const favorites = req.user.comics_favorites;
  marvel.comics.find("38978")
    .then((response) => console.log(response.data[0].id));
  // favorites.forEach((elm) => {
    
  // });

});
module.exports = router;
