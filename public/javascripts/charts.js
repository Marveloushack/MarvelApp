
const ComicsAPI = new comicsApi('https://gateway.marvel.com:443');


let characterList = []
let selectedCharId = "";
let pageCount = 2;
let comicData = [];
let counter = 0;

window.addEventListener('load', () => {

    ComicsAPI.getFileCharacteres()
        .then(response => {
            characterList = response.data.split('\n')
            console.log(characterList)

            let tempCharacter = characterList.map(character => ({
                label: character, value: character
            }))
            console.log(tempCharacter)
            let input = document.getElementById("theInput");
            autocomplete({
                input: input,
                fetch: function (text, update) {
                    text = text.toLowerCase();
                    var suggestions = tempCharacter.filter(n => n.label.toLowerCase().includes(text))
                    update(suggestions);
                },
                onSelect: function (item) {
                    input.value = item.label;
                }

            });

        }).catch(error => console.log('oOh No! Error is: ', error))


    document.getElementById('theButton').addEventListener('click', function (event) {
        event.preventDefault()

        const name = document.querySelector('#theInput').value;

        ComicsAPI.getCharacter(name)
            .then(responseFromApi => {
                selectedCharId = responseFromApi.data.data.results[0].id;
                const charInfo = responseFromApi.data.data.results[0];
                console.log(charInfo)
                compareRadialChart(charInfo, 'chart1')
            })
            .catch(err => {
                console.log("Error while getting the data: ", err);
            });
    })

    document.getElementById('theButton2').addEventListener('click', function (event) {
        event.preventDefault()

        const offset = 0;
        getComicsByCharacter(selectedCharId, offset)

    })

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

                    const dateInfo = comicData.map(comic => {
                        return comic.dates.filter(date => date.type == "onsaleDate")
                            .map(dateData => {
                                let year = dateData.date.substring(0, 7)
                                return year
                            })
                    })

                    let groupByDates = dateInfo.reduce((result, currentValue) => {
                        if (result[currentValue[0]]) {
                            result[currentValue[0]] += 1
                        } else {
                            result[currentValue[0]] = 1
                        }
                        return result;
                    }, {})
                    modelLineChart(groupByDates, 'chart2')
                }
            })
            .catch(err => {
                console.log("Error while getting the data: ", err);
            })
    }
})

function compareRadialChart(characters, id) {

    const data = {
        labels: ['Comics', 'Events', 'Series', 'Stories'],
        datasets: [{
            data: [
                characters.comics.available,
                characters.events.available,
                characters.series.available,
                characters.stories.available,
            ],
            borderWidth: 1,
            borderColor: styles.color.solids.map(eachColor => eachColor),
            backgroundColor: styles.color.alphas.map(eachColor => eachColor)
        }]
    }
    const options = {
        scale: {
            gridLines: {
                color: '#444'
            },
            ticks: {
                display: false
            }
        },
        legend: {
            position: 'right',
            labels: {
                fontColor: '#fff'
            }
        }
    }
    new Chart(id, { type: 'polarArea', data })
}

function modelLineChart(comicsByDate, id) {
    const data = {
        labels: Object.keys(comicsByDate).reverse(),
        datasets: [
            {
                labels: 'Comics',
                data: Object.values(comicsByDate).reverse(),
                borderColor: styles.color.solids.map(eachColor => eachColor),
                backgroundColor: styles.color.alphas.map(eachColor => eachColor),
                borderWidth: 1
            }
        ]
    }
    const options = {
        legend: {
            position: 'right',
            labels: {
                fontColor: '#fff'
            }
        }
    }
    new Chart(id, { type: "line", data, options })
}



console.log(charactersArray)