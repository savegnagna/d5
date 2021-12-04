let map;

function getRandom(max) {
  return (Math.random() * max) - (max / 2);
}

function generatMarker(map, pos) {
  for (let i = 0; i < 5; i++) {
    let delta = 0.025

    dpos = { lat: (pos.lat + (getRandom(delta))), lng: (pos.lng + (getRandom(delta/1.5))) }
    const markerb = new google.maps.Marker({
      position: dpos,
      map,
      label: {
        text: "\uD83D\uDEB2",
        fontSize: "1.75em",
      },
    });

    markerb.addListener("click", () => {
      console.log(markerb);
    });

    dpos = { lat: (pos.lat + (getRandom(delta))), lng: (pos.lng + (getRandom(delta/1.5))) }
    const markerv = new google.maps.Marker({
      position: dpos,
      map,
      label: "\uD83D\uDEF4",
    });

    markerv.addListener("click", () => {
      console.log(markerv);
    });

  }
}

function initMap(geo) {
  //init
  pos = { lat: geo.coords.latitude, lng: geo.coords.longitude }
  map = new google.maps.Map(document.getElementById("map"), {
    center: pos,
    zoom: 15,
    zoomControl: false,
    mapTypeControl: false,
    linksControl: false,
    panControl: false,
    addressControl: false,
    enableCloseButton: false,
    fullscreenControl: false,
    enableCloseButton: false,
  });

  //set Options
  map.setOptions({
    styles: [
      {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
      }]
  });
  generatMarker(map, pos)

  const popup_menu = document.getElementById("pop_manu_vel");

  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(popup_menu);
}

function mapGeneretor() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initMap);
  } else {
    console.error("enable geolocation");
  }
}