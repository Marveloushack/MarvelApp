let myMap = undefined;
window.onload = () => {
  const placeCenter = {
    lat: location.coordinates[0],
    lng: location.coordinates[1],
  };
  let mapOptions = {
    zoom: 15,
    center: placeCenter,
  };

  myMap = new google.maps.Map(document.getElementById("myMap"), mapOptions);
  
};
