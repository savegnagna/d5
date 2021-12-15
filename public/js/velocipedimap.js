let map;

function getRandom(max) {
  return (Math.random() * max) - (max / 2);
}

function generatMarker(map, pos) {
  let max = (Math.random() * 20) + 5;
	let delta = 0.025
  for (let i = 0; i < max; i++) {
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
  }

  max = (Math.random() * 100) + 5;
  for (let i = 0; i < max; i++) {
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

  dpos = { lat: pos.lat, lng: pos.lng }
	var car = {
    url: "images/pin.png", // url
    scaledSize: new google.maps.Size(40, 40), // scaled size
	};
	const markuser = new google.maps.Marker({
	  position: dpos,
	  map,
	  icon: car
	});

	markuser.addListener("click", () => {
	  console.log(markuser);
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

function QrControl(qrDiv, map) {
  // Set CSS for the qr button.
  const qrUI = document.createElement("div");
  qrUI.style.cursor = "pointer";
  qrUI.style.borderRadius = "50%";
  qrUI.style.textAlign = "center";
  qrUI.style.position = "absolute";
  qrUI.style.left = "-40px";
  qrUI.style.top = "600px";
  qrUI.title = "Click per scan qr";
  qrDiv.appendChild(qrUI);

  // Set CSS for the qr interior.
  const qrText = document.createElement("div");

  qrText.style.color = "black";
  qrText.style.fontSize = "35px";
  qrText.innerHTML = "<button id='qrcode' class='qrcode'><img src='images/qr-code.png' style='width: 40px; height: 40px; padding: 10px 7px ;'></button>";
  qrUI.appendChild(qrText);
  // Setup the click event listeners: simply set the map to Chicago.
  qrUI.addEventListener("click", () => {
	avvioCorsa()
  });
}

function EndControl(endDiv, map) {
  // Set CSS for the end button.
  const endUI = document.createElement("div");
  endUI.style.cursor = "pointer";
  endUI.style.borderRadius = "50%";
  endUI.style.textAlign = "center";
  endUI.style.position = "absolute";
  endUI.style.left = "-40px";
  endUI.style.top = "600px";
  endUI.title = "Click per terminare corsa";
  endDiv.appendChild(endUI);

  // Set CSS for the end interior.
  const endText = document.createElement("div");

  endText.style.color = "black";
  endText.style.fontSize = "35px";
  endText.innerHTML = "<button name='stop' class='qrcode'><img src='images/stop.png' style='width: 40px; height: 40px; padding: 10px 7px ;'></button>";
  endUI.appendChild(endText);
  // Setup the click event listeners: simply set the map to Chicago.
  endUI.addEventListener("click", () => {
	stop()
  });
}

function avvioCorsa() {
	if (confirm("\n\nAvviare corsa?")) {
		document.getElementById("qrcode").disabled = true;
		document.getElementById("backbut").disabled = true;
		document.getElementById("qrcode").remove();
		document.getElementById("backbut").remove();

		const EndControlDiv = document.createElement("div");
		EndControl(EndControlDiv, map);
		map.controls[google.maps.ControlPosition.TOP_CENTER].push(EndControlDiv);

	} else {
		location.href = "/";
	}
}

function stop() {
  if (confirm("\n\nTerminare corsa?")) {
    alert("\n\nTotale da pagare 7$");
    location.href = "/";
    
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

  const BackControlDiv = document.createElement("div");
  BackControl(BackControlDiv, map);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(BackControlDiv);

  const QrControlDiv = document.createElement("div");
  QrControl(QrControlDiv, map);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(QrControlDiv);
}

function mapGeneretor() {
  if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(initMap);
  } else {
	console.error("enable geolocation");
  }
}