var JS = JS || {};

(function () {

	'use strict';

	var m = JS.Module = {

		init: function() {
			$('.font-size-slider').slider();

			$('.slider--button').on('click', function(e) {
				e.preventDefault();

				var direction = $(this).data('direction');
				var dir = $('.font-size-slider').find(':selected')[direction]().val();
				if (dir) {
					$('.font-size-slider').val(dir).trigger('change');
				}
			});
		}

	};

}());

$(JS.Module.init);