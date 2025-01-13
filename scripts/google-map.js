let map;
let directionsService;
export let markers = [];

export function initMap() {
  const options = { zoom: 10, center: { lat: 39.6048, lng: -75.7452 } };
  map = new google.maps.Map(document.getElementById("tour-map"), options);

  directionsService = new google.maps.DirectionsService();

  addMarker(39.6048, -75.7452);
}

export function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(calcCoords);
  } else {
    alert("Geolocation may not supported by this browser!");
  }
}

function calcCoords(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  fillAddress(lat, lng);
}

function fillAddress(lat, lng) {
  const latlng = new google.maps.LatLng(lat, lng);
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        const city = results[1].address_components[1].short_name;
        const state = results[1].address_components[3].short_name;
        const country = results[1].address_components[4].short_name;
        document.getElementById("city").value = city;
        document.getElementById("state").value = state;
        document.getElementById("country").value = country;

        const location = city + ", " + state + ", " + country;
        moveLocation(location);

        const geocoder = new google.maps.Geocoder();
        geocoder &&
          geocoder.geocode({ address: location }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              lat = results[0].geometry.location.lat();
              lng = results[0].geometry.location.lng();
              markers[0].setMap(null);
              markers.splice(0, 1);
              addMarker(lat, lng);
            }
          });
      }
    }
  });
}

function addMarker(lat, lng, title = "", subtitle = "") {
  let marker;
  const index = markers.findIndex(
    (m) => m.position.lat == lat && m.position.lng === lng
  );

  const infoWindow = new google.maps.InfoWindow({
    content: `<h4>${title}</h4><p>${subtitle}</p>`,
    ariaLabel: title,
  });

  if (index === -1) {
    marker = new google.maps.Marker({
      position: { lat: lat, lng: lng },
      map: map,
      title: title,
      draggable: true,
      animation: google.maps.Animation.DROP,
    });

    if (title !== "") {
      marker.addListener("click", () => {
        infoWindow.open({ anchor: marker, map });
      });
      marker.setDraggable(false);
      markers.push(marker);
    }
    new google.maps.Marker(marker);
  }
}

export function setMarkers(concerts) {
  const geocoder = new google.maps.Geocoder();
  geocoder &&
    concerts.forEach((concert) => {
      const location = `${concert.venue}, ${concert.city}, ${concert.state}`;

      geocoder.geocode({ address: location }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          addMarker(
            lat,
            lng,
            concert.city + ", " + concert.state,
            concert.venue
          );
        }
      });
    });
}

function moveLocation(addr) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: addr }, (results, status) => {
    if (status == google.maps.GeocoderStatus.OK) {
      const lat = results[0].geometry.location.lat();
      const long = results[0].geometry.location.lng();
      const center = new google.maps.LatLng(lat, long);
      map.panTo(center);
    }
  });
}

export function checkDistance() {
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const country = document.getElementById("country").value;

  if (city === "" || state === "" || country === "") {
    alert("Please enter an address or use the autofill feature!");
    return;
  }

  const tours = document.querySelectorAll(".tour-dates ul li");

  let place = [];
  for (var i = 1; i < tours.length; i += 3) {
    place.push(tours.item(i).innerText);
  }

  let complex = [];
  for (var i = 2; i < tours.length; i += 3) {
    complex.push(tours.item(i).innerText);
  }

  let locations = [];
  for (var i = 0; i < place.length; i++) {
    locations.push(complex[i] + ", " + place[i]);
  }

  const start = city + ", " + state + ", " + country;
  directions(start, locations, locations.length);
}
function directions(start, locations, count) {
  directionsService.route(
    calcDistConditions(start, locations[count - 1]),
    (response, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        let distance = response.routes[0].legs[0].distance.value / 1609.34;
        distance = parseFloat(Math.round(distance * 100) / 100).toFixed(2);

        if (distance < 50) {
          moveLocation(locations[count - 1]);
          calcRoute(start, locations[count - 1]);
          return;
        }
        return directions(start, locations, count - 1);
      } else {
        alert("Error finding events! Please try again later.");
      }
    }
  );
}
function calcDistConditions(locationOne, locationTwo) {
  return {
    origin: locationOne,
    destination: locationTwo,
    travelMode: google.maps.DirectionsTravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    avoidHighways: !1,
    avoidTolls: !1,
  };
}
export function calcRoute(start = "", end) {
  if (start === "") {
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const country = document.getElementById("country").value;

    if (city === "" || state === "" || country === "") {
      return;
    }

    start = city + ", " + state + ", " + country;
  }

  const directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
  const request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode["DRIVING"],
  };

  directionsService.route(request, (response, status) => {
    if (status == "OK") {
      directionsRenderer.setDirections(response);
    }
  });
}
