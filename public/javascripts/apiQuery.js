const marvelApi = new apiHandler("https://gateway.marvel.com:443/v1/public");
let visibleCard = false

document.getElementById('fetch').addEventListener('click', function (event) { 
    event.preventDefault();
    const charName = document.querySelector("#character-name").value;
    visibleCard = true;

    marvelApi
      .getCharacter(charName)
        .then(responseFromApi => {
            const charInfo = responseFromApi.data.data.results[0];
            console.log(charInfo);
            document.querySelector(".char-name").innerHTML = charInfo.name;
            document.querySelector(".char-description").innerHTML = charInfo.description;
            document.querySelector(".char-img").src = charInfo.thumbnail.path+".jpg"
        })
      .catch((err) => console.log("No fue posible encontrar el personaje " + err));
})

