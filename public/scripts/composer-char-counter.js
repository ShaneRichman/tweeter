const MAXCHARS = 140;
$(function() {
  $(".new-tweet form").on("input", "textarea", function() {
    const charCounter = $(this).parent().find(".counter");
    console.log(charCounter.text());
    const charsLeft = MAXCHARS - this.value.length;
    const color = (charsLeft < 0) ? "red" : "#244751";
    charCounter.css({
      color: color
    }).text(charsLeft);
  });
});