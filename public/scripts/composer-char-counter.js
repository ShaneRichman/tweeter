const MAXCHARS = 140;
//When document loads checks input from user to display current characters left
$(function() {
  $(".new-tweet form").on("input", "textarea", function() {
    const charCounter = $(this).parent().find(".counter");
    const charsLeft = MAXCHARS - this.value.length;
    const color = (charsLeft < 0) ? "red" : "#244751";
    charCounter.css({
      color: color
    }).text(charsLeft);
  });
});