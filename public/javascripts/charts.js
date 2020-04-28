const ComicsAPI = new comicsApi('https://gateway.marvel.com:443');


window.addEventListener('load', () => {

    document.getElementById('theButton').addEventListener('click', function (event) {
        event.preventDefault()

        const name = document.querySelector('#theInput').value;

        ComicsAPI.getCharacter(name)
            .then(responseFromApi => {
                console.log('NAME', name)
                console.log('responseFromApi', responseFromApi);
                const charInfo = responseFromApi.data.data.results[0];
                console.log(charInfo)
                printTheChart(charInfo)

            })
            .catch(err => {
                console.log("Error while getting the data: ", err);
            });
    })
})

function printTheChart(characters) {
//document.body.classList.add("runing")
    compareRadialChart()
} 
function compareRadialChart() { 

    const data = {
        labels: ['Comics', 'Events', 'Series', 'Stories'],
        datasets: [{
            data: [6, 22, 9, 18],
            borderWidth: 1,
            borderColor: styles.color.solids.map(eachColor => eachColor),
            backgroundColor: styles.color.alphas.map(eachColor => eachColor)
        }]
    }
    new Chart('chart1', { type: 'polarArea', data })
        

}