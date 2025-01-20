window.HELP_IMPROVE_VIDEOJS = false;

state = {
  'doll': '6',
  'shirt': '2',
  'glasses': '41',
  'necklace': '126',
}

conceptToImageMapping = {
  'doll-6': 'static/images/interactive/concepts/concept-6.jpg',
  'doll-54': 'static/images/interactive/concepts/concept-54.jpg',
  'doll-122': 'static/images/interactive/concepts/concept-122.jpeg',
  'shirt-2': 'static/images/interactive/concepts/concept-2.jpg',
  'shirt-5': 'static/images/interactive/concepts/concept-5.jpg',
  'glasses-41': 'static/images/interactive/concepts/concept-41.jpg',
  'glasses-128': 'static/images/interactive/concepts/concept-128.jpg',
  'necklace-126': 'static/images/interactive/concepts/concept-126.jpg',
  'necklace-129': 'static/images/interactive/concepts/concept-129.jpg',
}

function changeSelection(newSelection) {
  var selectedClass = newSelection.split('-')[0];
  var selectedInstance = newSelection.split('-')[1];
  var prevInstance = state[selectedClass];
  $('#'+selectedClass+'-'+prevInstance).css('border', 'none');
  state[selectedClass] = selectedInstance;
  $('#'+selectedClass+'-'+selectedInstance).css('border', '5px solid red');

  var seed = "00";
  var image_path = `./static/images/interactive/results/a-${state["doll"]}-doll-wearing-a-${state["shirt"]}-shirt,-${state["necklace"]}-necklace-and-${state["glasses"]}-glasses-in-the-beach_gen_${seed}.jpg`
  if (state["necklace"] === "none") {
    image_path = image_path.replace('none-necklace', 'necklace');
  }
  if (state["glasses"] === "none") {
    image_path = image_path.replace('none-glasses', 'glasses');
  }
  $('#try-me-image').attr('src', image_path);
  $('#selected-'+selectedClass).attr('src', conceptToImageMapping[newSelection]);
};

$(document).ready(function() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      // true for mobile device
      $(".carousel-sec").css('padding-left', '0px');
      $(".carousel-sec").css('padding-right', '0px');
      $(".container").css('padding-left', '0px');
      $(".container").css('padding-right', '0px');
      $(".hero-body").css('padding-left', '0px');
      $(".hero-body").css('padding-right', '0px');
      $("img").each(function() {
        var currSrc = $(this)[0].src;
        ['light-1', 'light-2', 'light-3', 'tex-1', 'tex-2', 'tex-3', 'pose-1', 'pose-2', 'pose-3',
          'comb/1', 'comb/2', 'comb/3', 'comb/4', 'comb/5', 'comb/6', 'comb/7', 'comb/8',
          'multi_concepts/01', 'multi_concepts/02', 'multi_concepts/03', 'multi_concepts/04', 'multi_concepts/05', 'multi_concepts/06', 'multi_concepts/07', 'multi_concepts/08',
          'multi_concepts/09', 'multi_concepts/10', 'multi_concepts/11', 'multi_concepts/12', 'multi_concepts/13', 'multi_concepts/14', 'multi_concepts/15', 'multi_concepts/16',
          'multi_concepts/17', 'multi_concepts/18', 'multi_concepts/19', 'multi_concepts/20', 'multi_concepts/21', 'multi_concepts/22', 'multi_concepts/23', 'multi_concepts/24',
          'multi_concepts/25', 'multi_concepts/26', 'multi_concepts/27', 'multi_concepts/28', 'storytelling_fig'

        ].forEach((element) => {
          currSrc = currSrc.replace(element, element + '-mobile')
        })
        $(this)[0].src = currSrc
      })
    }
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });
    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
      pagination: false,
      pauseOnHover: true,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    bulmaSlider.attach();

    var seed = "00";
    var image_path = `./static/images/interactive/results/a-${state["doll"]}-doll-wearing-a-${state["shirt"]}-shirt,-${state["necklace"]}-necklace-and-${state["glasses"]}-glasses-in-the-beach_gen_${seed}.jpg`
    if (state["necklace"] === "none") {
      image_path = image_path.replace('none-necklace', 'necklace');
    }
    if (state["glasses"] === "none") {
      image_path = image_path.replace('none-glasses', 'glasses');
    }
    $('#try-me-image').attr('src', image_path);

    $('[data-toggle="popover"]').popover({
      container: 'body'
    });
    $('body').on('click', function (e) {
      $('[data-toggle=popover]').each(function () {
          // hide any open popovers when the anywhere else in the body is clicked
          if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
              $(this).popover('hide');
          }
      });
  });
    $('#doll').attr('data-content', " \
      <div class='row'> \
        <div id='doll-6-div' class='column'><img id='doll-6' class='selection-image' src='static/images/interactive/concepts/concept-6.jpg'></div> \
        <div id='doll-122-div' class='column'><img id='doll-122' class='selection-image' src='static/images/interactive/concepts/concept-122.jpeg'></div> \
      </div>");

    $('#doll').on('shown.bs.popover', function () {
      $('#doll-'+state["doll"]).css('border', '5px solid red');
      $('#doll-6-div').click(function() {changeSelection('doll-6');});
      $('#doll-122-div').click(function() {changeSelection('doll-122');});
    })

    $('#shirt').attr('data-content', " \
      <div class='row'> \
        <div id='shirt-2-div' class='column'><img id='shirt-2' class='selection-image' src='static/images/interactive/concepts/concept-2.jpg'></div> \
        <div id='shirt-5-div' class='column'><img id='shirt-5' class='selection-image' src='static/images/interactive/concepts/concept-5.jpg'></div> \
      </div>");

    $('#shirt').on('shown.bs.popover', function () {
      $('#shirt-'+state["shirt"]).css('border', '5px solid red');
      $('#shirt-2-div').click(function() {changeSelection('shirt-2');});
      $('#shirt-5-div').click(function() {changeSelection('shirt-5');});
    }) 

    $('#glasses').attr('data-content', " \
      <div class='row'> \
        <div id='glasses-41-div' class='column'><img id='glasses-41' class='selection-image' src='static/images/interactive/concepts/concept-41.jpg'></div> \
        <div id='glasses-128-div' class='column'><img id='glasses-128' class='selection-image' src='static/images/interactive/concepts/concept-128.jpg'></div> \
      </div>");

    $('#glasses').on('shown.bs.popover', function () {
      $('#glasses-'+state["glasses"]).css('border', '5px solid red');
      $('#glasses-41-div').click(function() {changeSelection('glasses-41');});
      $('#glasses-128-div').click(function() {changeSelection('glasses-128');});
    }) 

    $('#necklace').attr('data-content', " \
      <div class='row'> \
        <div id='necklace-126-div' class='column'><img id='necklace-126' class='selection-image' src='static/images/interactive/concepts/concept-126.jpg'></div> \
        <div id='necklace-129-div' class='column'><img id='necklace-129' class='selection-image' src='static/images/interactive/concepts/concept-129.jpg'></div> \
      </div>");

    $('#necklace').on('shown.bs.popover', function () {
      $('#necklace-'+state["necklace"]).css('border', '5px solid red');
      $('#necklace-126-div').click(function() {changeSelection('necklace-126');});
      $('#necklace-129-div').click(function() {changeSelection('necklace-129');});
    }) 

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      // true for mobile device
      $(".slider-item > img").css('width', '90%');
      $(".slider-navigation-next").css('width', '20px');
      $(".slider-navigation-next").css('height', '20px');
      $(".slider-navigation-previous").css('width', '20px');
      $(".slider-navigation-previous").css('height', '20px');
    }

})
