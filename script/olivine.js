(function ($) {
    'use strict';

    $.fn.olivine = function (o) {
        var d = {
            speed: 300,
            interval: 2000,
            direction: 'left'
        },
            intervalID,
            elemItemWrap = $(this).find('.item-wrap'),
            elemItem = $(this).find('.item'),
            itemW = elemItem.find('li').width(),
            itemL = elemItem.find('li').length,
            current = 0,
            fo = $.extend({}, d, o);


        function slide(dir) {
            $('.nav').hide();
            current = current + 1;
            elemItem.animate({
                left: -(itemW * current)
            },
                fo.speed, function () {
                    $('.nav').show();
                    if (current == itemL) {
                        elemItem.css('left', 0);
                        current = 0;
                    }
                });
        }

        return this.each(function () {

            elemItem.children().clone().appendTo(elemItem);
            elemItem.css('width', elemItem.find('li').length * itemW);

            intervalID = setInterval(function () {slide(fo.direction); }, fo.interval);

            elemItemWrap
                .bind('mouseover', function () {
                    clearInterval(intervalID);
                })
                .bind('mouseout', function () {
                    intervalID = setInterval(function () {slide(fo.direction); }, fo.interval);
                });
        });
    };

}(jQuery));
