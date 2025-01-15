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
});
