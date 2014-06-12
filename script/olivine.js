(function ($) {
    'use strict';

    $.fn.olivine = function (o) {
        var d = {
            speed: 100,
            interval: 2000,
            direction: 'left'
        },
            intervalID,
            elemItemWrap = $(this).find('.item-wrap'),
            elemItem = $(this).find('.item'),
            pclone = elemItem.children().clone(true),
            aclone = elemItem.children().clone(true),
            itemW = elemItem.find('li').width(),
            itemL = elemItem.find('li').length,
            elemPrev = $(this).find('.prev'),
            elemNext = $(this).find('.next'),
            current = 0,
            fo = $.extend({}, d, o);

        function prev() {
            $('.nav').hide();
            current = current - 1;
            if (current < 0) {
                elemItem.animate({
                    left: itemW * Math.abs(current) - (itemW * itemL)
                },
                    fo.speed, function () {
                        $('.nav').show();
                        if (current == -1) {
                            elemItem.css('left', -(itemW * itemL * 2 - itemW));
                            current = itemL - 1;
                        }
                    });
            } else {
                elemItem.animate({
                    left: -(itemW * current) - (itemW * itemL)
                },
                    fo.speed, function () {
                        $('.nav').show();
                        if (current == -1) {
                            elemItem.css('left', -(itemW * itemL * 2 - itemW));
                            current = itemL - 1;
                        }
                    });
            }
        }

        function next() {
            $('.nav').hide();
            current = current + 1;
            elemItem.animate({
                left: -(itemW * current) - (itemW * itemL)
            },
                fo.speed, function () {
                    $('.nav').show();
                    if (current == itemL) {
                        elemItem.css('left', -(itemW * itemL));
                        current = 0;
                    }
                });
        }

        return this.each(function () {

            pclone.appendTo(elemItem);
            aclone.prependTo(elemItem);
            elemItem.css('width', elemItem.find('li').length * itemW);
            elemItem.css('left', -(itemW * itemL));

            if (fo.direction == 'left') {
                intervalID = setInterval(function () {next(fo.direction); }, fo.interval);

                elemItemWrap
                    .bind('mouseover', function () {
                        clearInterval(intervalID);
                    })
                    .bind('mouseout', function () {
                        intervalID = setInterval(function () {next(fo.direction); }, fo.interval);
                    });
            } else if (fo.direction == 'right') {
                intervalID = setInterval(function () {prev(); }, fo.interval);

                elemItemWrap
                    .bind('mouseover', function () {
                        clearInterval(intervalID);
                    })
                    .bind('mouseout', function () {
                        intervalID = setInterval(function () {prev(); }, fo.interval);
                    });
            }

            elemPrev.bind('click', function(e) {
                prev();
                clearInterval(intervalID);
                if (fo.direction == 'left') {
                    intervalID = setInterval(function () {next(); }, fo.interval);
                } else if (fo.direction == 'right') {
                    intervalID = setInterval(function () {prev(); }, fo.interval);

                }
                e.preventDefault();
            });

            elemNext.bind('click', function(e) {
                next();
                clearInterval(intervalID);
                if (fo.direction == 'left') {
                    intervalID = setInterval(function () {next(); }, fo.interval);
                } else if (fo.direction == 'right') {
                    intervalID = setInterval(function () {prev(); }, fo.interval);

                }
                e.preventDefault();
            });
        });
    };

}(jQuery));
