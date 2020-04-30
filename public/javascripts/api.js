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
                limit: 100,
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

    postComicsInfo(comicsInfo) {
        return this.axiosServer.post("/user/comics", {
            comics_favorites: comicsInfo
        })
    }

    postSeriesInfo(seriesInfo) {
        return this.axiosServer.post("/user/series", {
            series_favorites: seriesInfo
        })
    }

    getFileCharacteres() {
        return this.axiosServer.get("/files/characters.txt")
    }


    getCharacteresPreferences() {
        return this.axiosServer.get("/user/favorites")
    }

    getUserStatus() {
        return this.axiosServer.get("/user/status")
    }
    getAllComics() {
        return this.axiosAPI.get('/v1/public/comics', {
            params: {
                limit: 100,
                ts: 1,
                apikey: "85c8538a62118493c2d1e4338ea2123d",
                hash: "4c84cd0092ff9166501a8991fded25b7"

                // ts: apiConfig.ts,
                // hash: apiConfig.hash,
                // apikey: apiConfig.apikey
            }
        })
    }

    getAllComicsbyRange() {
        return this.axiosAPI.get('/v1/public/comics', {
            params: {
                limit: 100,
                dateRange: "2015-01-01,2020-01-01",
                ts: 1,
                apikey: "85c8538a62118493c2d1e4338ea2123d",
                hash: "4c84cd0092ff9166501a8991fded25b7"

                // ts: apiConfig.ts,
                // hash: apiConfig.hash,
                // apikey: apiConfig.apikey
            }
        })
    }

    getAllComicsByCharacter(characterId, offSet) {
        return this.axiosAPI.get(`/v1/public/characters/${characterId}/comics`, {
            params: {
                limit: 100,
                offset: offSet,
                dateRange: "2015-01-01,2020-04-01",
                ts: 1,
                apikey: "85c8538a62118493c2d1e4338ea2123d",
                hash: "4c84cd0092ff9166501a8991fded25b7",
                // ts: apiConfig.ts,
                // hash: apiConfig.hash,
                // apikey: apiConfig.apikey
            }
        })
    }
    getAllSeries() {
        return this.axiosAPI.get('/v1/public/series', {
            params: {
                limit: 100,
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

    getComics(title) {
        return this.axiosAPI.get(`/v1/public/comics`, {
            params: {
                title,
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

