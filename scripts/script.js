$(document).ready(function () {
  $(window).scroll(() =>
    $(".title").css("opacity", 1 - $(window).scrollTop() / 1000)
  );

  const getOffset = () => $("nav").offset().top;
  let contentOffset = getOffset();
  $(window).resize(() => (contentOffset = getOffset()));

  $(window).scroll(() => {
    $(window).scrollTop() > contentOffset
      ? $(".to-top").css("opacity", ".8")
      : $(".to-top").css("opacity", "0");
  });

  $(".to-top").click(() => {
    $("body, html").animate({ scrollTop: $("#site-nav").offset().top }, 800);
    return !1;
  });
});

function ticketPriceChange() {
  const ticketType = document.getElementById("ticket-type");
  const ticketPrice = document.getElementById("ticket-price");

  ticketPrice.value = ticketType.value == "Standard" ? "$25.00" : "$45.00";
}

var editionArray = {
  Classic: "(Classic)/Black.png",
  Modern: "(Modern)/Ash.png",
};
function editionChangeShirt() {
  const itemShirt = $(".item-shirt")[0];
  const editionShirt = $(".edition-shirt")[0];
  const colorList = $(".color-shirt");

  let source = itemShirt.src;
  source = source.substring(0, source.indexOf("("));
  source += editionArray[editionShirt.value];
  itemShirt.src = source;
  switch (editionShirt.value) {
    case "Classic":
      colorList
        .empty()
        .append(
          "" +
            '<option value="/Black.png">Black</option>' +
            '<option value="/Navy.png">Navy</option>'
        );
      break;
    case "Modern":
      colorList
        .empty()
        .append(
          "" +
            '<option value="/Ash.png">Ash</option>' +
            '<option value="/White.png">White</option>' +
            '<option value="/Indigo Blue.png">Indigo Blue</option>'
        );
      break;
  }
}

function colorChangeShirt() {
  var source = $(".item-shirt")[0].src;
  source = source.substring(0, source.indexOf(")") + ")".length);
  $(".item-shirt")[0].src = source + $(".color-shirt")[0].value;
}

function editionChangeHoodie() {
  const itemHoodie = $(".item-hoodie")[0];
  const editionHoodie = $(".edition-hoodie")[0];
  const colorList = $(".color-hoodie");

  let source = itemHoodie.src;
  source = source.substring(0, source.indexOf("("));
  source += editionArray[editionHoodie.value];
  itemHoodie.src = source;

  switch (editionHoodie.value) {
    case "Classic":
      colorList
        .empty()
        .append(
          "" +
            '<option value="/Black.png">Black</option>' +
            '<option value="/Navy.png">Navy</option>'
        );
      break;
    case "Modern":
      colorList
        .empty()
        .append(
          "" +
            '<option value="/Ash.png">Ash</option>' +
            '<option value="/Charcoal Heather.png">Charcoal Heather</option>'
        );
      break;
  }
}

function colorChangeHoodie() {
  var source = $(".item-hoodie")[0].src;
  source = source.substr(0, source.lastIndexOf("/"));
  $(".item-hoodie")[0].src = source + $(".color-hoodie")[0].value;
}
function colorChangeHat() {
  var source = $(".item-hat")[0].src;
  source = source.substr(0, source.lastIndexOf("/"));
  $(".item-hat")[0].src = source + $(".color-hat")[0].value;
}

function checkLogin() {
  var usernameInput = document.getElementById("username");
  var passwordInput = document.getElementById("password");
  var username = usernameInput.value;
  var password = passwordInput.value;

  if (password === "" && username === "") {
    invalidTextColor(usernameInput);
    invalidTextColor(passwordInput);
    alert("Login fields are blank!");
    return !1;
  } else if (username === "") {
    invalidTextColor(usernameInput);
    validTextColor(passwordInput);
    alert("Username field is blank!");
    return !1;
  } else if (password === "") {
    invalidTextColor(passwordInput);
    validTextColor(usernameInput);
    alert("Password field is blank!");
    return !1;
  } else {
    validTextColor(usernameInput);
    validTextColor(passwordInput);
    return !0;
  }
}

function invalidTextColor(text) {
  text.style.color = "black";
  text.style.backgroundColor = "rgba(255,0,0,.5)";
}
function validTextColor(text) {
  text.style.color = "black";
  text.style.backgroundColor = "rgb(255,255,255)";
}

function checkSignup() {
  var invalid = !1;
  var ematch = !1;
  var psmatch = !1;
  var pslength = !1;
  var requiredFields = [
    "firstname",
    "lastname",
    "sex",
    "email",
    "address",
    "city",
    "state",
    "country",
    "username",
    "password",
    "password-cf",
  ];

  requiredFields.forEach((value, index) => {
    const txtFld = document.getElementById(value);
    if (txtFld.value == "") {
      invalidTextColor(txtFld);
      invalid = !0;
    } else {
      validTextColor(txtFld);
    }
  });

  var email = document.getElementById("email").value;
  var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  email.match(emailFormat) ? (ematch = !0) : (ematch = !1);

  var passOne = document.getElementById("password").value;
  var passTwo = document.getElementById("password-cf").value;
  passOne != passTwo ? (psmatch = !1) : (psmatch = !0);
  psmatch && (passOne.length >= 6 ? (pslength = !0) : (pslength = !1));

  if (invalid && !ematch && !psmatch) {
    alert("Form content is missing/email is invalid/passwords do not match!");
    return !1;
  } else if (!ematch && !psmatch) {
    alert("Email is invalid/passwords do not match!");
    invalidTextColor(document.getElementById("email"));
    invalidTextColor(document.getElementById("password"));
    invalidTextColor(document.getElementById("password-cf"));
    return !1;
  } else if (invalid) {
    alert("Form content is missing! Please review.");
    return !1;
  } else if (!ematch) {
    alert("Email is invalid!");
    invalidTextColor(document.getElementById("email"));
    return !1;
  } else if (!psmatch) {
    alert("Passwords do not match!");
    invalidTextColor(document.getElementById("password"));
    invalidTextColor(document.getElementById("password-cf"));
    return !1;
  } else if (!pslength) {
    alert("Password must be at least 6 characters in length!");
    invalidTextColor(document.getElementById("password"));
    invalidTextColor(document.getElementById("password-cf"));
    return !1;
  }

  if (confirm("Are you sure you want to submit this form?")) return !0;
  else return !1;
}

function checkChangeInfo() {
  var invalid = !1;
  var ematch = !1;
  var requiredFields = [
    "firstname",
    "lastname",
    "email",
    "address",
    "city",
    "state",
    "country",
  ];

  requiredFields.forEach((value) => {
    const txtFld = document.getElementById(value);
    if (txtFld.value == "") {
      invalidTextColor(txtFld);
      invalid = !0;
    } else {
      validTextColor(txtFld);
    }
  });

  var email = document.getElementById("email").value;
  var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  email.match(emailFormat) ? (ematch = !0) : (ematch = !1);

  if (invalid) {
    alert("Form content is missing! Please review.");
    return !1;
  } else if (invalid && ematch) {
    alert("Form content is missing/email is invalid/passwords do not match!");
    return !1;
  } else if (!ematch) {
    alert("Email is invalid!");
    invalidTextColor(document.getElementById("email"));
    return !1;
  }

  if (confirm("Are you sure you want to submit these changes?")) return !0;
  else return !1;
}

function checkChangePassword() {
  var invalid = !1;
  var psmatch = !1;
  var psoldmatch = !1;
  var pslength = !1;
  var requiredFields = ["password-o", "password-n", "password-c"];
  requiredFields.forEach((value) => {
    const txtFld = document.getElementById(value);
    if (txtFld.value == "") {
      invalidTextColor(txtFld);
      invalid = !0;
    } else {
      validTextColor(txtFld);
    }
  });

  var passOld = document.getElementById("password-o");
  var passOne = document.getElementById("password-n");
  var passTwo = document.getElementById("password-c");

  passOld.value == passOne.value ? (psoldmatch = !0) : (psoldmatch = !1);
  passOne.value != passTwo.value ? (psmatch = !1) : (psmatch = !0);

  psmatch && (passOne.value.length >= 6 ? (pslength = !0) : (pslength = !1));

  if (invalid) {
    alert("Form content is missing! Please review.");
    return !1;
  } else if (!psmatch) {
    alert("New passwords do not match!");
    invalidTextColor(passOne);
    invalidTextColor(passTwo);
    return !1;
  } else if (!pslength) {
    alert("New password must be at least 6 characters in length!");
    invalidTextColor(passOne);
    invalidTextColor(passTwo);
    return !1;
  } else if (psoldmatch) {
    alert("New password cannot be the same as old password!");
    invalidTextColor(passOne);
    invalidTextColor(passTwo);
    return !1;
  }
}

$(".members").on("click", "img", function () {
  const $target = $(this).siblings(".member-desc");
  const targetIsActive = $target.hasClass("active");

  if (!targetIsActive) {
    $target.addClass("active");
    $target.addClass("members-animate-on");
    $target.removeClass("members-animate-off");
  } else {
    $target.removeClass("active");
    $target.removeClass("members-animate-on");
    $target.addClass("members-animate-off");
  }
});

var map;
function initMap() {
  var options = { zoom: 10, center: { lat: 39.6048, lng: -75.7452 } };
  map = new google.maps.Map(document.getElementById("tour-map"), options);
  var tours = document.querySelectorAll(".tour-dates ul li");

  var place = [];
  for (var i = 1; i < tours.length; i += 3) {
    place.push(tours.item(i).innerText);
  }

  var complex = [];
  for (var i = 2; i < tours.length; i += 3) {
    complex.push(tours.item(i).innerText);
  }

  var spot = [];
  for (var i = 0; i < place.length; i++) {
    spot.push(complex[i] + ", " + place[i]);
  }

  place.forEach((value, index) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: spot[index] }, (results, status) => {
      if (status === "OK") {
        var city = results[0].address_components[2].short_name;
        var state = results[0].address_components[4].short_name;
        if (state.length > 3) {
          city = results[0].address_components[3].short_name;
          state = results[0].address_components[5].short_name;
        }

        var tours = document.querySelectorAll(".tour-dates ul li");
        var full = city + ", " + state;
        var date;
        var c = 1;
        for (var i = 0; i < tours.length; i += 3) {
          if (tours.item(c).innerText.toLowerCase() === full.toLowerCase()) {
            date = tours.item(i).innerText;
          }
          c += 3;
        }

        var p = results[0].geometry.location;
        var marker = new google.maps.Marker({ position: p, map: map });
        var infoWindow = new google.maps.InfoWindow({
          content: "<h1>" + city + ", " + state + "</h1><h4>" + date + "</h4>",
        });

        marker.addListener("click", () => infoWindow.open(map, marker));
      }
    });
  });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(calcCoords);
  } else {
    alert("Geolocation may not supported by this browser!");
  }
}

function calcCoords(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  fillAddress(lat, lng);
}

function fillAddress(lat, lng) {
  const latlng = new google.maps.LatLng(lat, lng);
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        const city = results[1].address_components[2].short_name;
        const state = results[1].address_components[4].short_name;
        const country = results[1].address_components[5].short_name;
        document.getElementById("city").value = city;
        document.getElementById("state").value = state;
        document.getElementById("country").value = country;

        const location = city + ", " + state + ", " + country;
        moveLocation(location);
      }
    }
  });
}

function checkDistance() {
  var city = document.getElementById("city").value;
  var state = document.getElementById("state").value;
  var country = document.getElementById("country").value;

  if (city == "" || state == "" || country == "") {
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

  let spot = [];
  for (var i = 0; i < place.length; i++) {
    spot.push(complex[i] + ", " + place[i]);
  }

  const start = city + ", " + state + ", " + country;
  directions(start, spot, spot.length);
}

function directions(start, spot, count) {
  if (count > 0) {
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(
      calcDistConditions(start, spot[count - 1]),
      (response, status) => {
        if (status == google.maps.DirectionsStatus.OK) {
          var distance = response.routes[0].legs[0].distance.value / 1609.34;
          distance = parseFloat(Math.round(distance * 100) / 100).toFixed(2);

          if (distance < 50) {
            moveLocation(spot[count - 1]);
            return;
          }
          return directions(start, count - 1);
        } else {
          alert("Error finding events! Please try again later.");
        }
      }
    );
    calcRoute(directionsService, start, spot[count - 1]);
  } else {
    alert("No nearby events found!");
    return count;
  }
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

function moveLocation(addr) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: addr }, (results, status) => {
    if (status == google.maps.GeocoderStatus.OK) {
      var lat = results[0].geometry.location.lat();
      var long = results[0].geometry.location.lng();
      var center = new google.maps.LatLng(lat, long);
      map.panTo(center);
    }
  });
}

function calcRoute(directionsService, start, end) {
  var directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
  var request = {
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
