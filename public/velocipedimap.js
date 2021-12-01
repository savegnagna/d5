let map;

function initMap(position) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: position.coords.latitude, lng: position.coords.longitude },
    zoom: 15,
  });
  console.log(position.coords.longitude);
}

function mapGeneretor() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initMap);
  } else {
    console.error("Enabole geolocation");
  }
}