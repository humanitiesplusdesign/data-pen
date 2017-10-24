if ($('#about-text').css('text-align') === 'left') {
  $("#ani-type").text("the world's");
} else {
  var loopCheck = true;

  var typed = new Typed('#ani-type', {
    strings: ["the world's", "VIAF's", "Electronic Enlightenment’s", "the Library of Congress’", "Geonames’", "Wikidata’s", "your colleagues’"],
    typeSpeed: 50,
    backSpeed: 20,
    backDelay: 3000,
    smartBackspace: true, // this is a default
    cursorChar: '',
    loop: true
  });

  $(window).scroll(function() {
    if ($('#tagline').visible()) {
      typed.start();
    } else {
      typed.stop();
    }
  });
}
