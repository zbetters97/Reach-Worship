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

function loadPage() {}

const editionArray = {
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
  let source = $(".item-shirt")[0].src;
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
  let source = $(".item-hoodie")[0].src;
  source = source.substr(0, source.lastIndexOf("/"));
  $(".item-hoodie")[0].src = source + $(".color-hoodie")[0].value;
}

function colorChangeHat() {
  let source = $(".item-hat")[0].src;
  source = source.substr(0, source.lastIndexOf("/"));
  $(".item-hat")[0].src = source + $(".color-hat")[0].value;
}
