let myMap = undefined;
window.onload = () => {
  const placeCenter = {
    lat: 40.388069,
    lng: -3.698748,
  };
  let mapOptions = {
    zoom: 15,
    center: placeCenter,
  };

  infowindow = new google.maps.InfoWindow();

  myMap = new google.maps.Map(document.getElementById("socialmap"), mapOptions);

  getUsers();
};

function getUsers() {
  axios.get("/social").then((userson) => {
    const user = userson.data;
    user.forEach((elm) => {
      placeMarker(elm);
    });
  });
}

function placeMarker(user) {
  let location = user.address;
  let key= "AIzaSyBVMurTF7q2Y_BtyZgyI6GQ0BDfp_M6gss"
  axios
    .get("https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key="+key)
    .then((geoRes) => {
      let latitude = geoRes.data.results[0].geometry.location.lat;
      let longitude = geoRes.data.results[0].geometry.location.lng;
      let center = { lat: latitude, lng: longitude };

      let marker = new google.maps.Marker({
        map: myMap,
        position: center,
        icon: {
          url: "/images/marvelapp-pointer.png",
          scaledSize: new google.maps.Size(30, 50),
        },
      });

      google.maps.event.addListener(marker, "click", function () {
        infowindow.setContent("<div><strong>Usuario:</strong> " + user.username + "</div><div><strong>Email:</strong><a href=#>" + user.email + "</a></div>");
        infowindow.open(myMap, this);
      });
    })
    .catch((err) => console.log("Error con el mapa social", err));
}
