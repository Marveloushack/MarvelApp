const ComicsAPI = new comicsApi('https://gateway.marvel.com:443');


let favoriteList = []
let selectedCharId = "";
let pageCount = 1;
let comicData = [];
let counter = 0;

window.addEventListener('load', () => {

    ComicsAPI.getCharacteresPreferences()
        .then(response => {
            favoriteList = response.data
            console.log("ESTE ES SIN CERO", favoriteList)
            console.log("VAlor", favoriteList[7])
            ComicsAPI.getCharacter(favoriteList[7])
                .then(character => {
                    console.log("cargo")
                    let characterByName = character.data.data.results
                    selectedCharId = character.data.data.results[0].id;
                    console.log(selectedCharId)
                })
                .catch(error => console.log('oOh No! Error is: ', error))
        })
        .catch(error => console.log('oOh No! Error is: ', error))

    document.getElementById('theButton_smartList').addEventListener('click', function (event) {
        event.preventDefault()
        const offset = 0;
        getComicsByCharacter(selectedCharId, offset)
        function getComicsByCharacter(charId, offset) {
            return ComicsAPI.getAllComicsByCharacter(charId, offset)
                .then(responseFromApi => {
                    comicData = []
                    const results = responseFromApi.data.data.results;
                    comicData = [...comicData, ...responseFromApi.data.data.results];
                    counter += 1;
                    offset += results.limit;

                    if (counter < pageCount) {
                        getComicsByCharacter(charId, offset)
                    } else {
                        console.log(comicData)
                        const dateInfo = comicData.map(comic => {
                            return {
                                title: comic.title,
                                thumbnail: comic.thumbnail,
                                characters: comic.characters.items.filter(char => char.name != favoriteList[0])
                            }
                        })
                            .filter(comic => Object.keys(comic.characters).length > 0)
                        console.log('ESTA', dateInfo)

                        for (let i = 0; i < 4; i++) {
                            let randomRecom = Math.round(Math.random() * ((dateInfo.length - 1) - 0) + 0);
                            console.log('RANDOM', randomRecom)
                            document.querySelector(`.char-img${i}`).src = dateInfo[randomRecom].thumbnail.path + "." + dateInfo[i].thumbnail.extension;
                            document.querySelector(`.char-name${i}`).innerHTML = dateInfo[randomRecom].title;

                        }


                    }
                })
                .catch(err => {
                    console.log("Error while getting the data: ", err);
                })
        }
    })

})
