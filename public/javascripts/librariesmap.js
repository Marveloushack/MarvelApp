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

  myMap = new google.maps.Map(document.getElementById("myMap"), mapOptions);
  
};
