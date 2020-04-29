const marvelApi = new apiHandler("https://gateway.marvel.com:443/v1/public");

document.getElementById("fetch").addEventListener("click", function (event) {
  event.preventDefault();
  const charName = document.querySelector(".character-name").value;
  marvelApi
    .getCharacter(charName)
    .then((responseFromApi) => {
      const charInfo = responseFromApi.data.data.results[0];
      document.querySelector(".char-img").src = charInfo.thumbnail.path + ".jpg";
      document.querySelector(".char-name").innerHTML = charInfo.name;
      charInfo.description
        ? (document.querySelector(".char-description").innerHTML = charInfo.description)
        : (document.querySelector(".char-description").innerHTML = "No description available");

      document.querySelector("#details").href = "/details/" + charInfo.id;
    })
    .catch((err) => console.log("No fue posible encontrar el personaje " + err));
});

