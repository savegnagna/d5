let map;

function getRandom(max) {
  return (Math.random() * max) - (max / 2);
}

function generatMarker(map, pos) {
	let delta = 0.025

	dpos = { lat: pos.lat, lng: pos.lng }
	var car = {
    url: "images/pin.png", // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
	};
	const markuser = new google.maps.Marker({
	  position: dpos,
	  map,
	  icon: car
	});

	markuser.addListener("click", () => {
	  console.log(markuser);
	});

  dpos = { lat: (pos.lat + (getRandom(delta))), lng: (pos.lng + (getRandom(delta/1.5))) }
  var car = {
     url: "images/car.png", // url
     scaledSize: new google.maps.Size(30, 30), // scaled size
  };
  const markerv = new google.maps.Marker({
    position: dpos,
    map,
    icon: car
  });
  markerv.addListener("click", () => {
    console.log(markerv);
  });
}

function BackControl(backDiv, map) {
  // Set CSS for the back button.
  const backUI = document.createElement("div");

  backUI.style.backgroundColor = "rgba(12, 173, 12, 0)";
  backUI.style.border = "1px solid rgba(12, 173, 12, 0)";
  backUI.style.cursor = "pointer";
  backUI.style.borderRadius = "50%";
  backUI.style.textAlign = "center";
  backUI.style.position = "absolute";
  backUI.style.left = "-160px";
  backUI.style.top = "30px";
  backUI.title = "Click per tornare indietro";
  backDiv.appendChild(backUI);

  // Set CSS for the back interior.
  const backText = document.createElement("div");

  backText.style.color = "black";
  backText.style.fontSize = "35px";
  backText.innerHTML = "<button id='backbut' class='qrcode'><strong>&#8592</strong></button>";
  backUI.appendChild(backText);
  // Setup the click event listeners: simply set the map to Chicago.
  backUI.addEventListener("click", () => {
	history.back()
  });
}

function CallControl(qrDiv, map) {
  // Set CSS for the qr button.
  const callUI = document.createElement("div");
  callUI.style.cursor = "pointer";
  callUI.style.borderRadius = "50%";
  callUI.style.textAlign = "center";
  callUI.style.position = "absolute";
  callUI.style.left = "-40px";
  callUI.style.top = "600px";
  callUI.title = "Click per chiamare cliente";
  qrDiv.appendChild(callUI);

  // Set CSS for the qr interior.
  const callText = document.createElement("div");

  callText.style.color = "black";
  callText.style.fontSize = "35px";
  callText.innerHTML = "<button class='callbtn'>CHIAMA<br>UTENTE</button>";
  callUI.appendChild(callText);
  // Setup the click event listeners: simply set the map to Chicago.
  callUI.addEventListener("click", () => {
	  alert("\nChiamata in corso..\n..\n..\n..\n..\nChiamata terminata.")
  });
}

function initMap(geo) {
  //init
  pos = { lat: geo.coords.latitude, lng: geo.coords.longitude }
  map = new google.maps.Map(document.getElementById("map"), {
	center: pos,
	zoom: 14,
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

  const BackControlDiv = document.createElement("div");
  BackControl(BackControlDiv, map);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(BackControlDiv);

  const CallControlDiv = document.createElement("div");
  CallControl(CallControlDiv, map);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(CallControlDiv);
}

function mapGeneretor() {
  if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(initMap);
  } else {
	console.error("enable geolocation");
  }
}

function prenota(){
  if(confirm("Tempo di arrivo 5 minuti. \nCosto della tratta: 15$. \n\nPrenotare tratta?")){
    alert("\nPagamento effettuato")
    location.href = "/";
  }
}