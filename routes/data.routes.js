const express = require("express");
const router = express.Router();
const api = require("marvel-api");

const marvel = api.createClient({
  publicKey: process.env.myPublicKey,
  privateKey: process.env.myPrivateKey,
});

router.get("/search", (req, res) => res.render("data/search"));
router.get("/details/:id", (req, res) => {
  const charPromise = marvel.characters.find(req.params.id);
  const comicsPromise = marvel.characters.comics(req.params.id)
  const eventsPromise = marvel.characters.events(req.params.id)
  const storiesPromise = marvel.characters.series(req.params.id);
    Promise.all([charPromise, comicsPromise, eventsPromise, storiesPromise])
        .then(results => {
          res.render("data/details", {
            character: results[0].data,
            comics: results[1].data,
            events: results[2].data,
            series: results[3].data
          })
        })
      .catch((err) => console.log("Error al mostrar detalles ", err));
});

module.exports = router;
