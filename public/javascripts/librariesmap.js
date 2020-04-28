let myMap = undefined;
let infowindow;
window.onload = () => {
  const placeCenter = {
    lat: 40.391074,
    lng: -3.701793,
  };
  let mapOptions = {
    zoom: 15,
    center: placeCenter,
  };
  infowindow = new google.maps.InfoWindow();
  myMap = new google.maps.Map(document.getElementById("librariesmap"), mapOptions);
  let request = {
    location: placeCenter,
    radius: "1000",
    type: ["comic"],
  };

  service = new google.maps.places.PlacesService(myMap);
  service.nearbySearch(request, callback);

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
        console.log(results[i].name);
      }
    }
  }
  function createMarker(place) {
    var marker = new google.maps.Marker({
      map: myMap,
      position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "click", function () {
      infowindow.setContent(place.name);
      infowindow.open(myMap, this);
    });
  }
};
