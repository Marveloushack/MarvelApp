const express = require("express");
const router = express.Router();
//const marvelApi = new apiHandler("https://gateway.marvel.com:443/v1/public");

router.get("/search", (req, res) => res.render("data/search"));
router.get("/details/:id", (req, res) => {
    res.render("data/details")
//   marvelApi
//     .getCharDetails(req.params.id)
//     .then(selectedChar => console.log(selectedChar.data))
//     .catch(err => console.log("Hubo un error " + err))
})


module.exports = router;
