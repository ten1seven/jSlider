/*! jquery.slider.js v 2.0 | Author: Jeremy Fields [jeremy.fields@viget.com], 2013 | License: MIT */

(function($) {

	$.jslider = function(el, options) {
		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
		var base = this;

		// Access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;

		// Add a reverse reference to the DOM object
		base.$el.data('jslider', base);

		base.init = function() {
			base.append();
			base.vars();
			base.addIncrements();
			base.bind();

			base.moveHandle((base.selected * base.zoneWidth), false);
			base.$el.attr('size', base.size);
		};

		base.append = function() {
			base.$slider = $('<div class="slider--control"><button class="slider--handle"></button><span class="slider--track"></span></div>').insertAfter(base.$el);

			base.$handle = base.$slider.find('.slider--handle');
		};

		base.vars = function() {
			base.size = base.$el.find('option').size();
			base.zonePercent = parseFloat(100 / (base.size - 1));
			base.setTrackValues();
		};

		base.setTrackValues = function() {
			base.trackOffset = parseInt(base.$slider.offset().left, 10);
			base.trackWidth = parseInt(base.$slider.width(), 10);
			base.zoneWidth = base.trackWidth / (base.size - 1);
			base.selected = base.$el.find(':selected').index();
		};

		base.addIncrements = function() {
			var strOut = '';

			for (var i = 0; i < base.size; i++) {
				strOut += '<i class="slider--track__increment" style="left: ' + (base.zonePercent * i) + '%;"></i>';
			}

			base.$slider.append(strOut);
		};

		base.bind = function() {
			base.$el.on('change.slider', function() {
				base.selected = base.$el.find(':selected').index();
				base.moveHandle((base.selected * base.zoneWidth), true);
			});

			base.$slider
				.on('mouseleave.slider', base.stopdrag)
				.on('mousedown.slider', '.slider--handle', base.startdrag)
				.on('mouseup.slider', '.slider--handle', base.stopdrag)
				.on('click.slider', '.slider--track', base.trackClick);
		};

		base.startdrag = function() {
			base.setTrackValues();

			base.$slider.on('mousemove.slider', function(e) {
				var sliderPos = e.pageX - base.trackOffset;

				if (sliderPos >= base.trackWidth) {
					sliderPos = base.trackWidth;
				}

				base.moveHandle(sliderPos, false);
			});
		};

		base.moveHandle = function(pos, animate) {
			var increment = Math.round(pos / base.zoneWidth);
			var move = increment * base.zoneWidth;
			var movePercent = (move / base.trackWidth) * 100;
			var action = (animate) ? 'animate' : 'css';

			base.updateSelect(increment);
			base.$handle[action]({
				'left': movePercent + '%'
			}, 180);
		};

		base.stopdrag = function() {
			base.$slider.off('mousemove.slider');
		};

		base.trackClick = function() {
			base.moveHandle(event.offsetX, true);
		};

		base.updateSelect = function(num) {
			if (num !== base.selected) {
				base.selected = num;
				base.$el.val(base.$el.find('option').eq(num).val()).trigger('update');
			}
		};

		base.init();
	};

	$.fn.jslider = function(options) {
		return this.each(function() {
			(new $.jslider(this, options));
		});
	};

})(jQuery);