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
