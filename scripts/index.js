import { concerts } from "../data/concerts.js";

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

  showDates();

  $(".to-top").click(() => {
    $("body, html").animate({ scrollTop: $("#site-nav").offset().top }, 800);
    return !1;
  });
});

function showDates() {
  let eventsHTML = ``;

  const homePageConcerts = concerts.slice(0, 3);

  homePageConcerts.forEach((event) => {
    eventsHTML += `
      <ul>
        <li>${event.date} @ ${event.time} (EST)</li>
        <li>${event.city}, ${event.state}</li>
        <li>${event.venue}</li>
      </ul>      
    `;
  });

  $(".home-tour-dates").html(eventsHTML);
}
