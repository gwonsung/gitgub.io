$(".has-child").click(function(){
   $(this).toggleClass("on")
   $(".has-child ul").parent().not(this).find("ul").slideUp(500, "easeOutExpo");
   $(this).find("ul").slideToggle(500, "easeOutExpo");
});
$('.has-scrollable').each(function(){
  const ps = new PerfectScrollbar($(this)[0], {
    wheelPropagation: true
  });
});
var ps = new PerfectScrollbar('.has-scrollable-menu');


$( window ).resize(function() {
  var new_width = $('.content').width();
  $('.paging').width(new_width);
});

$('.filer_btn').click(function() {
  $('.filer-area').fadeToggle('fast', function() {
  });
});

$('.fill_btn').click(function() {
  $('.detail_search').slideToggle('fast', function() {
  });
});

$(".icon-more").click(function(){
   $(this).next().fadeToggle(500, "easeOutExpo");
});

$(function(){
  var new_width = $('.content').width();
  $('.paging').width(new_width);
});

$('.space_layer_button').click(function() {
  $('.space_layer').fadeToggle('fast', function() {
  });
});
$('.space_close').click(function() {
  $('.space_layer').fadeToggle('fast', function() {
  });
});

$.modal.defaults = {
  closeExisting: true,    // Close existing modals. Set this to false if you need to stack multiple modal instances.
  escapeClose: true,      // Allows the user to close the modal by pressing `ESC`
  clickClose: true,       // Allows the user to close the modal by clicking the overlay
  closeText: 'asd',     // Text content for the close <a> tag.
  closeClass: 'asd',         // Add additional class(es) to the close <a> tag.
  fadeDelay: 1.0          // Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
};

$(function() {
		var Accordion = function(el, multiple) {
				this.el = el || {};
				this.multiple = multiple || false;

				var links = this.el.find('.article-title');
				links.on('click', {
						el: this.el,
						multiple: this.multiple
				}, this.dropdown)
		}

		Accordion.prototype.dropdown = function(e) {
				var $el = e.data.el;
				$this = $(this),
						$prev = $this.prev();

				$prev.slideToggle();
				$this.parent().toggleClass('open');
        $('.article-title i').toggleClass("fa-sort-up");
        $('.article-title i').toggleClass("fa-sort-down");

				if (!e.data.multiple) {
						$el.find('.accordion-content').not($prev).slideUp().parent().removeClass('open');
				};
		}
		var accordion = new Accordion($('.accordion-container'), false);
});














// $('select').each(function(){
//     var $this = $(this), numberOfOptions = $(this).children('option').length;
//
//     $this.addClass('select-hidden');
//     $this.wrap('<div class="select"></div>');
//     $this.after('<div class="select-styled"></div>');
//
//     var $styledSelect = $this.next('div.select-styled');
//     $styledSelect.text($this.children('option').eq(0).text());
//
//     var $list = $('<ul />', {
//         'class': 'select-options'
//     }).insertAfter($styledSelect);
//
//     for (var i = 0; i < numberOfOptions; i++) {
//         $('<li />', {
//             text: $this.children('option').eq(i).text(),
//             rel: $this.children('option').eq(i).val()
//         }).appendTo($list);
//     }
//
//     var $listItems = $list.children('li');
//
//     $styledSelect.click(function(e) {
//         e.stopPropagation();
//         $('div.select-styled.active').not(this).each(function(){
//             $(this).removeClass('active').next('ul.select-options').hide();
//         });
//         $(this).toggleClass('active').next('ul.select-options').toggle();
//     });
//
//     $listItems.click(function(e) {
//         e.stopPropagation();
//         $styledSelect.text($(this).text()).removeClass('active');
//         $this.val($(this).attr('rel'));
//         $list.hide();
//     });
//
//     $(document).click(function() {
//         $styledSelect.removeClass('active');
//         $list.hide();
//     });
//
// });
