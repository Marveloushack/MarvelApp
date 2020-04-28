const ComicsAPI = new comicsApi('https://gateway.marvel.com:443');


window.addEventListener('load', () => {
    axios
        .getCharacter(name)
        .then(responseFromAPI => {
            console.log("The response from API: ", responseFromAPI);
        })
        .catch(err => {
            console.log("Error while getting the data: ", err);
        });
})