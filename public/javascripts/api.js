//const apiConfig = require('../configs/marvelApi.config');
//const axios = require('axios').default;
const baseUrl = "https://gateway.marvel.com:443"
const marvelApi = axios.create({
    baseUrl: "https://gateway.marvel.com:443"
});

class comicsApi {
    constructor() {
        this.axiosAPI = axios.create({
            baseURL: "https://gateway.marvel.com:443"
        })

        this.axiosServer = axios.create({
            baseURL: "http://localhost:3000"
        })
    }

    getAllCharacters() {
        return this.axiosAPI.get(`/v1/public/characters`, {
            params: {
                ts: 1,
                apikey: "85c8538a62118493c2d1e4338ea2123d",
                hash: "4c84cd0092ff9166501a8991fded25b7"

                // ts: apiConfig.ts,
                // hash: apiConfig.hash,
                // apikey: apiConfig.apikey
            }
        })
    }

    postCharaterInfo(characterInfo) {
        return this.axiosServer.post("/user/characters", {
            character_favorites: characterInfo
        })
    }

    getAllComics() {
        return this.axiosAPI.get('/v1/public/comics', {
            params: {
                ts: 1,
                apikey: "85c8538a62118493c2d1e4338ea2123d",
                hash: "4c84cd0092ff9166501a8991fded25b7"

                // ts: apiConfig.ts,
                // hash: apiConfig.hash,
                // apikey: apiConfig.apikey
            }
        })
    }


    getAllSeries() {
        return this.axiosAPI.get('/v1/public/series', {
            params: {
                ts: 1,
                apikey: "85c8538a62118493c2d1e4338ea2123d",
                hash: "4c84cd0092ff9166501a8991fded25b7"

                // ts: apiConfig.ts,
                // hash: apiConfig.hash,
                // apikey: apiConfig.apikey
            }
        })
    }



    getCharacter(name) {
        return this.axiosAPI.get(`/v1/public/characters`, {
            params: {
                name,
                ts: 1,
                apikey: "85c8538a62118493c2d1e4338ea2123d",
                hash: "4c84cd0092ff9166501a8991fded25b7"

                // ts: apiConfig.ts,
                // hash: apiConfig.hash,
                // apikey: apiConfig.apikey
            }
        })
    }

    getComicId(id) {
        return this.axiosAPI.get(`/v1/public/comics/${id}`, {
            params: {
                ts: 1,
                apikey: "85c8538a62118493c2d1e4338ea2123d",
                hash: "4c84cd0092ff9166501a8991fded25b7"

                // ts: apiConfig.ts,
                // hash: apiConfig.hash,
                // apikey: apiConfig.apikey
            }
        })
    }

}

