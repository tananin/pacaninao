$(function(){
  $.get("http://lpmailer.herokuapp.com/form.html")

  $('a[href*=#]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
    
//$('header').hcSticky({
//    bottomEnd: -9900,
//});

  //
  // Forms
  //

	var recipient = 'cherkasbohdan@gmail.com';

	$("form").submit(function(event){
		event.preventDefault();

    // Fix required not supported, emulate it
    if (!Modernizr.input.required) {
      var requiredInputsAreEmpty = $(this).find("input[required]").filter(function(){ return $(this).val() == ""; }).length;
      if (requiredInputsAreEmpty) {
        alert("Поля обязательны для заполнения!");
        return false;
      }
    }

		$(this).find('[name="recipient"]').val(recipient);

    $('button, a').attr("disabled", true);
    $.post('http://lpmailer.herokuapp.com/', $(this).serialize()).always(function(){
      window.location = '3.html';
    })
});


  //
  // Countdown Timer
  //
  
  // set the interval in 72 hours
  var delta = new Date("2013/09/24 00:00:00").getTime() - new Date("2013/09/21 00:00:00").getTime();

  // variables for time units
  var days, hours, minutes, seconds;

  //set zero if the number is less than 10
  var pad = function (n) {
    return (n < 10 && n >=0) ? ("0" + n) : n;
  }

  //define the word
  function Den (days) {
    if (days < 1 || days > 5) {
      return "Дней";
    }
    else if (days > 1 && days <5) {
      return "Дня";
    }
    else {
      return "День";
    }
  }

  // update the tag with id "countdown" every 1 second
  setInterval(function () {

    //Set an and date
      //set the start date of reference.
      //Important! Set display format "/" for IE and all brousers
      var start_date = new Date("2013/09/22 00:00:00").getTime();
      //get the current date
      var current_date = new Date().getTime();
      //find the difference between the current and the start date
      var diff_date = current_date - start_date;
      //find the remaining time
      var remainder = diff_date % delta;
      var part_of_delta = delta - remainder;
      //set and date
      var offer = start_date + diff_date + part_of_delta;
      //set the date format
      var offer = new Date(offer);
      //set the display format
      var offer_day = ("Акция только до " + offer.getDate() + "." + (offer.getMonth()+1) + "." + (offer.getFullYear()-2000));

    // Find the amount of "seconds" between now and target
    // do some time calculations
      var seconds_left = (delta - remainder) / 1000;

      var days = Math.ceil(seconds_left / 86400);

      var hours = parseInt(seconds_left / 3600);
      var seconds_left = seconds_left % 3600;

      var minutes = parseInt(seconds_left / 60);
      var seconds = parseInt(seconds_left % 60);

      var daypad = Den(days);

      var only_day = ("Только " + days + " " + daypad + " (до " + offer.getDate() + "." + (offer.getMonth()+1) + ")");
    // format countdown string + set tag value
      countdown_days.textContent=(pad(days));
      countdown_hours.textContent=(pad(hours));
      countdown_minutes.textContent=(pad(minutes));
      countdown_seconds.textContent=(pad(seconds));
      
      countdown_days2.textContent=(pad(days));
      countdown_hours2.textContent=(pad(hours));
      countdown_minutes2.textContent=(pad(minutes));
      countdown_seconds2.textContent=(pad(seconds));
      
      onlyTo.textContent=(pad(only_day));
      offerTo.textContent=(pad(offer_day));
  }, 1000);


  //
  // Placeholder
  //

  // Support placeholders in IE9
  $('input, textarea').placeholder();


  //
  // Fix validation alert
  //

  $(document).ready(function() {
    var elements = document.getElementsByTagName("input, textarea");
    for (var i = 0; i < elements.length; i++) {
      elements[i].oninvalid = function(e) {
        e.target.setCustomValidity("");
        if (!e.target.validity.valid) {
          e.target.setCustomValidity("Пожалуйста, заполните это поле");
        }
      };
      elements[i].oninput = function(e) {
        e.target.setCustomValidity("");
      };
    }
  });

  //
  // Fancybox
  //

  $(".fancybox").fancybox();
})();