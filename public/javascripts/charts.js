const ComicsAPI = new comicsApi('https://gateway.marvel.com:443');


window.addEventListener('load', () => {

    document.getElementById('theButton').addEventListener('click', function (event) {
        event.preventDefault()

        const name = document.querySelector('#theInput').value;

        ComicsAPI.getCharacter(name)
            .then(responseFromApi => {
                const charInfo = responseFromApi.data.data.results[0];
                console.log(charInfo)
                printTheChart(charInfo)
            })
            .catch(err => {
                console.log("Error while getting the data: ", err);
            });
    })

    document.getElementById('theButton2').addEventListener('click', function (event) {
        event.preventDefault()

        const title = document.querySelector('#theInput2').value;

        ComicsAPI.getAllComics()
            .then(responseFromApi => {
                const comicInfo = responseFromApi.data.data.results;
                console.log(comicInfo)
                printTheChart(comicInfo)
            })
            .catch(err => {
                console.log("Error while getting the data: ", err);
            });
    })

    document.getElementById('theButton2').addEventListener('click', function (event) {
        event.preventDefault()

        const title = document.querySelector('#theInput2').value;

        ComicsAPI.getAllComicsbyRange()
            .then(responseFromApi => {
                const comicInfo = responseFromApi.data.data.results;

                const dateInfo = comicInfo.map(comic => {
                    return comic.dates.filter(date => date.type == "onsaleDate")
                });

                console.log(dateInfo)
                printTheChart(comicInfo)
            })
            .catch(err => {
                console.log("Error while getting the data: ", err);
            });
    })

    document.getElementById('theButton2').addEventListener('click', function (event) {
        event.preventDefault()

        const character= document.querySelector('#theInput2').value;

        ComicsAPI.getAllComicsbyRange(character)
            .then(responseFromApi => {
                const comicInfo = responseFromApi.data.data.results;

                const charInfo = comicInfo.map(comic => {
                    return comic.dates.filter(date => date.type == "onsaleDate")
                });

                const dateInfo = comicInfo.map(comic => {
                    return comic.dates.filter(date => date.type == "onsaleDate")
                });

                console.log(dateInfo)
                printTheChart(comicInfo)
            })
            .catch(err => {
                console.log("Error while getting the data: ", err);
            });
    })



})

function printTheChart(characters) {
    //document.body.classList.add("runing")
    compareRadialChart(characters, 'chart1')
}
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