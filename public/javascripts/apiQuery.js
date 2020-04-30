const marvelApi = new apiHandler("https://gateway.marvel.com:443/v1/public");
characterList = [];
window.addEventListener("load", () => {

  $("#display-info").hide();

  marvelApi
    .getFileCharacteres()
    .then((response) => {
      characterList = response.data.split("\n");
      let tempCharacter = characterList.map((character) => ({
        label: character,
        value: character,
      }));

      let input = document.getElementById("character-name");

      autocomplete({
        input: input,
        fetch: function (text, update) {
          text = text.toLowerCase();
          var suggestions = tempCharacter.filter((n) => n.label.toLowerCase().includes(text));
          update(suggestions);
        },

        onSelect: function (item) {
          input.value = item.label;
        },
      });
    })
    .catch((error) => console.log("oOh No! Error is: ", error));

  document.getElementById("fetch").addEventListener("click", function (event) {
    event.preventDefault();

    const charName = document.querySelector(".character-name").value;
    marvelApi
      .getCharacter(charName)
      .then((responseFromApi) => {
        $("#display-info").show();
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
});
