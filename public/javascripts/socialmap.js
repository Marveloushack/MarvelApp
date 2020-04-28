
let myMap = undefined;
window.onload = () => {
  const placeCenter = {
    lat: 40.391074,
    lng: -3.701793,
  };
  let mapOptions = {
    zoom: 15,
    center: placeCenter,
  };

  myMap = new google.maps.Map(document.getElementById("socialmap"), mapOptions);

  getUsers();
};

function getUsers() {
  axios
      .get("/social")
    .then((userson) => {
      const user = userson.data;
      user.forEach((elm) => {
        const center = {
          lat: elm.location.coordinates[0],
          lng: elm.location.coordinates[1],
        };
        new google.maps.Marker({
          position: center,
          map: myMap,
          title: elm.username,
        });
      });
    })
    .catch((error) => console.log(error));
}
