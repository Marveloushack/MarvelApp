const ComicsAPI = new comicsApi('https://gateway.marvel.com:443');

let characterList = []
let characters_favorites = []
let comics_favorites = []
let series_favorites = []

window.addEventListener('load', () => {
    document.getElementById('theButton').addEventListener('click', function (event) {
        event.preventDefault()

        ComicsAPI.getFileCharacteres()
            .then(response => {
                characterList = response.data.split('\n')
                console.log(characterList)

                let tempCharacter = characterList.map(character => ({
                    label: character, value: character
                }))
                console.log(tempCharacter)

                var input = document.getElementById("theInput-character");

                autocomplete({
                    input: input,
                    fetch: function (text, update) {
                        text = text.toLowerCase();
                        var suggestions = tempCharacter.filter(n => n.label.toLowerCase().includes(text))
                        update(suggestions);
                        console.log("suggestions", suggestions, text)
                    },
                    onSelect: function (item) {
                        input.value = item.label;
                        characters_favorites.push(input.value)
                        console.log(characters_favorites)

                        const containerPref = document.querySelector('.character-preferences')
                        containerPref.innerHTML += `<button type="button" class="btn btn-outline-danger">${input.value} </button>`

                    }

                });
            })
            .catch(error => console.log('oOh No! Error is: ', error))
    })

    document.getElementById("safeButton").addEventListener('click', function (event) {
        event.preventDefault()
        ComicsAPI.postCharaterInfo(characters_favorites)
    })

    document.getElementById('theButton-comics').addEventListener('click', function (event) {
        event.preventDefault()

        ComicsAPI.getAllComics()
            .then(allComics => {
                let comics = allComics.data.data.results
                let comicsName = [...comics]
                let tempComics = comicsName.map(comics => ({
                    label: comics.title, value: comics.title
                }))

                console.log(tempComics)

                var input = document.getElementById("theInput-comics");
                autocomplete({
                    input: input,
                    fetch: function (text, update) {
                        text = text.toLowerCase();
                        var suggestions = tempComics.filter(n => n.label.toLowerCase().includes(text))
                        update(suggestions);
                        console.log("suggestions", suggestions, text)
                    },
                    onSelect: function (item) {
                        input.value = item.label;
                        comics_favorites.push(input.value)
                        console.log(comics_favorites)
                        const containerPref = document.querySelector('.comics-preferences')
                        containerPref.innerHTML += `<button type="button" class="btn btn-outline-danger">${input.value} </button> `
                    }
                });
            })
            .catch(error => console.log('oOh No! Error is: ', error))
    })


    document.getElementById("safeButton").addEventListener('click', function (event) {
        event.preventDefault()
        ComicsAPI.postComicsInfo(comics_favorites)
    })

    document.getElementById('theButton-series').addEventListener('click', function (event) {
        event.preventDefault()

        ComicsAPI.getAllSeries()
            .then(allComics => {
                let series = allComics.data.data.results
                let seriesName = [...series]
                let tempSeries = seriesName.map(comics => ({
                    label: comics.title, value: comics.title
                }))

                console.log(tempSeries)

                var input = document.getElementById("theInput-series");
                autocomplete({
                    input: input,
                    fetch: function (text, update) {
                        text = text.toLowerCase();
                        var suggestions = tempSeries.filter(n => n.label.toLowerCase().includes(text))
                        update(suggestions);
                        console.log("suggestions", suggestions, text)
                    },
                    onSelect: function (item) {
                        input.value = item.label;
                        series_favorites.push(input.value)
                        console.log(series_favorites)
                        const containerPref = document.querySelector('.series-preferences')
                        containerPref.innerHTML += `<button type="button" class="btn btn-outline-danger">${input.value}  </button> `
                    }
                });
            })
            .catch(error => console.log('oOh No! Error is: ', error))
    })

    document.getElementById("safeButton").addEventListener('click', function (event) {
        event.preventDefault()
        ComicsAPI.postSeriesInfo(series_favorites)
    })





    // document.getElementById('theButton').addEventListener('click', function (event) {
    //     event.preventDefault()

    //     const charName = document.querySelector('#theInput').value;

    //     ComicsAPI.getCharacter(charName)
    //         .then(responseFromApi => {
    //             console.log('CHAR', charName)
    //             console.log('responseFromApi', responseFromApi);
    //             const charInfo = responseFromApi.data.data.results[0];
    //             console.log(charInfo)

    //             document.querySelector(".char-name").innerHTML = charInfo.name;
    //             document.querySelector(".char-description").innerHTML = charInfo.description;
    //             document.querySelector(".char-img").src = charInfo.thumbnail.path + ".jpg";
    //             document.querySelector("#details").href = "/details/" + charInfo.id

    //         })
    //         .catch(error => console.log('Oh No! Error is: ', error))
    // })


})