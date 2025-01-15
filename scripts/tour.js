import { concerts } from "../data/concerts.js";
import {
  initMap,
  getLocation,
  checkDistance,
  setMarkers,
} from "../data/map.js";

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

  showDates();
  initMap();

  $(".loc-button").on("click", () => {
    getLocation();
  });

  $(".find-button").on("click", () => {
    checkDistance();
  });
});

function showDates() {
  let eventsHTML = ``;

  concerts.forEach((event) => {
    eventsHTML += `
      <div class="tour-dates">
        <ul>
          <li>${event.date} @ ${event.time} (EST)</li>
          <li>${event.city}, ${event.state}</li>
          <li>${event.venue}</li>
        </ul>

        <hr />
        <form action="" method="post">
          <button
            type="submit"
            class="ticket-link link"
            name="order-ticket-btn"
          >
            >-Tickets-
          </button>
        </form>
      </div>
    `;
  });

  $(".events").html(eventsHTML);
  setMarkers(concerts);
}
