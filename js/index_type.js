if ($('#about-text').css('text-align') === 'left') {
  $("#ani-type").text("linked data sources around the world");
} else {
  var loopCheck = true;

  var typed = new Typed('#ani-type', {
    strings: ["linked data sources around the world", "VIAF", "the Library of Congress", "Geonames", "Wikidata", "your colleagues' data"],
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
