let CryptoJS = require("crypto-js");

let apiConfig = {
    urlBase: "https://gateway.marvel.com:443/",
    privatekey: process.env.PVK,
    apikey: process.env.PBK,
    ts: Math.floor(Date.now() / 1000),
    hash: CryptoJS.MD5(ts + privatekey + apikey)
}

module.exports = apiConfig