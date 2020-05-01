const ComicsAPI = new comicsApi('https://gateway.marvel.com:443');

let characterList = []
let characters_favorites = []
let comics_favorites = []
let series_favorites = []


window.addEventListener('load', () => {
    $("#theInput-character").show();
    $("#theInput-comics").hide();
    $("#theInput-series").hide();

    ComicsAPI.getFileCharacteres()
        .then(response => {
            characterList = response.data.split('\n')


            let tempCharacter = characterList.map(character => ({
                label: character, value: character
            }))

            var input = document.getElementById("theInput-character");

            autocomplete({
                input: input,
                fetch: function (text, update) {
                    text = text.toLowerCase();
                    var suggestions = tempCharacter.filter(n => n.label.toLowerCase().includes(text))
                    update(suggestions);

                },
                onSelect: function (item) {
                    input.value = item.label;
                    characters_favorites.push(input.value)


                    const containerPref = document.querySelector('.character-preferences')
                    containerPref.innerHTML += `<button type="button" class="btn btn-outline-danger">${input.value} </button>`
                    input.value = ""

                }

            });
        })
        .catch(error => console.log('oOh No! Error is: ', error))

    document.getElementById('theButton').addEventListener('click', function (event) {
        event.preventDefault()

        $("#theInput-character").show();
        $("#theInput-comics").hide();
        $("#theInput-series").hide();
    })

    document.getElementById("safeButton").addEventListener('click', function (event) {
        event.preventDefault()
        ComicsAPI.postCharaterInfo(characters_favorites)
        $('#modal-save').modal()
    })

    document.getElementById('theButton-comics').addEventListener('click', function (event) {
        event.preventDefault()

        $("#theInput-character").hide();
        $("#theInput-comics").show();
        $("#theInput-series").hide();

        ComicsAPI.getAllComics()
            .then(allComics => {
                let comics = allComics.data.data.results
                let comicsName = [...comics]
                let tempComics = comicsName.map(comics => ({
                    label: comics.title, value: comics.title
                }))

                var input = document.getElementById("theInput-comics");
                autocomplete({
                    input: input,
                    fetch: function (text, update) {
                        text = text.toLowerCase();
                        var suggestions = tempComics.filter(n => n.label.toLowerCase().includes(text))
                        update(suggestions);

                    },
                    onSelect: function (item) {
                        input.value = item.label;
                        comics_favorites.push(input.value)

                        const containerPref = document.querySelector('.comics-preferences')
                        containerPref.innerHTML += `<button type="button" class="btn btn-outline-danger">${input.value} </button> `
                        input.value = ""
                    }
                });
            })
            .catch(error => console.log('oOh No! Error is: ', error))
    })


    document.getElementById("safeButton").addEventListener('click', function (event) {
        event.preventDefault()
        ComicsAPI.postComicsInfo(comics_favorites)
        $('#modal-save').modal()
    })

    document.getElementById('theButton-series').addEventListener('click', function (event) {
        event.preventDefault()

        $("#theInput-character").hide();
        $("#theInput-comics").hide();
        $("#theInput-series").show();

        ComicsAPI.getAllSeries()
            .then(allComics => {
                let series = allComics.data.data.results
                let seriesName = [...series]
                let tempSeries = seriesName.map(comics => ({
                    label: comics.title, value: comics.title
                }))


                let input = document.getElementById("theInput-series");
                autocomplete({
                    input: input,
                    fetch: function (text, update) {
                        text = text.toLowerCase();
                        let suggestions = tempSeries.filter(n => n.label.toLowerCase().includes(text))
                        update(suggestions);

                    },
                    onSelect: function (item) {
                        input.value = item.label;
                        series_favorites.push(input.value)

                        const containerPref = document.querySelector('.series-preferences')
                        containerPref.innerHTML += `<button type="button" class="btn btn-outline-danger">${input.value}  </button> `
                        input.value = ""
                    }
                });
            })
            .catch(error => console.log('oOh No! Error is: ', error))
    })

    document.getElementById("safeButton").addEventListener('click', function (event) {
        event.preventDefault()
        ComicsAPI.postSeriesInfo(series_favorites)
        $('#modal-save').modal()

    })

})
