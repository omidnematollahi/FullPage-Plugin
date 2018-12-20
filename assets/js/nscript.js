/* Created By Omid Nematollahi */
var scrollIsTop = true;
var scrollEnd = false;
(function ($) {
    var page = location.search ? urlToObject(location.search).page : 1;
    var opt = {
        'index': page,
        'pageContainer': '.slide',
        'after': function () {
        },
        'before': function () {
        },
        'speed': false,
        'refresh': false,
        'useWheel': true,
        'useKeyboard': true,
        'useAnimation': true,
        'navigationHolder': null
    };
    var after = true;
    var delay = true;
    var keyIndex = opt.index - 1;
    var defaultSpeed = 700;
    var pageCount = 1;
    var direction = '';
    var removedIndex = '';
    window.slidePage = {
        'stop': false,
        'init': function (option, callback) {
            defaultSpeed = $(opt.pageContainer).css('transition-duration').replace('s', '') * 1000;
            pageCount = $(opt.pageContainer).length;
            $.extend(opt, option);
            initDom(opt);
            initEvent(opt);
            slidePage.navigationHolder.html("");
            for (var i = 0; i < pageCount; i++) {
                var anchor = $(opt.pageContainer).eq(i).attr("data-anchor");
                if ($(opt.pageContainer).eq(i).attr("data-horiz") == "true") {
                    if (!$(opt.pageContainer).eq(i).hasClass('horiz')) {
                        slidePage.navigationHolder.append('<div></div>');
                    }
                    slidePage.navigationHolder.append("<a onclick=slidePage.changeHash('" + anchor + "') style='display: inline-block'></a>");
                } else {
                    slidePage.navigationHolder.append("<a onclick=slidePage.changeHash('" + anchor + "')></a>");
                }
            }
            callback && callback.call(this);
            slidePage.navigationHolder.find('a').eq(0).addClass('active');
        },
        'index': function (index) {
            if (index > 0 && index != keyIndex + 1) {
                index = parseInt(index) - 1;
                if (index > keyIndex) {
                    var x = $(opt.pageContainer).eq(keyIndex).data('anchor');
                    var y = $(opt.pageContainer).eq(index).data('anchor');
                    if ($(opt.pageContainer).eq(keyIndex).data('horiz') && x.substring(0, x.indexOf('-')) == y.substring(0, y.indexOf('-')))
                        nextPageH($(opt.pageContainer).eq(keyIndex), index);
                    else
                        nextPageV($(opt.pageContainer).eq(keyIndex), index);
                } else if (index < keyIndex) {
                    var x = $(opt.pageContainer).eq(keyIndex).data('anchor');
                    var y = $(opt.pageContainer).eq(index).data('anchor');
                    if ($(opt.pageContainer).eq(keyIndex).data('horiz') && x.substring(0, x.indexOf('-')) == y.substring(0, y.indexOf('-'))) {
                        prevPageH($(opt.pageContainer).eq(keyIndex), index)
                    }

                    else
                        prevPageV($(opt.pageContainer).eq(keyIndex), index)
                }
                keyIndex = index;
            }
            return keyIndex
        },
        'currentItem': function () {
            return keyIndex;
        },
        'changeHash': function (anchor) {
            location.hash = "#" + anchor;
            var anch = anchor.split('-')[0];
            $('.main_nav li a').removeClass('active');
            $('[data-id^=' + anch + ']').addClass('active');
            delay = false;
        },
        'checkScroll': function (index) {
            var scrollable = $(opt.pageContainer).eq(index).find('.scrollable');
            var scrollable_height = scrollable.height();
            var win_height = $(window).height();
            if (scrollable_height < win_height) {
                scrollEnd = true;
                scrollIsTop = true;
            }
        },
        'fire': function (index) {
            fireAnimate(index)
        },

        canNext: true,
        canPrev: true,
        isScroll: false
    };
    var obj = {
        'nextSlide': function (item) {
            var nextItem = item.next();
            var current = $(opt.pageContainer).eq(keyIndex);
            if (!current.hasClass("horiz")) {
                hideVer(current);
            }
            else {
                hideHoriz(current);
            }
            if (nextItem.hasClass("horiz")) {
                item.css({
                    'transform': 'translate3d(-100%, 0, 0px)',
                    '-webkit-transform': 'translate3d(-100%, 0, 0px)'
                });
                nextItem.css(translate_x("0"));
            } else {
                item.css({
                    'transform': 'translate3d(0px, -100%, 0px)',
                    '-webkit-transform': 'translate3d(0px,-100%, 0px)'
                });
                var css = translate('0');
                nextItem.css(css);
            }
        },
        'nextSlideVertical': function (item, index) {
            var target = $(opt.pageContainer).eq(index);
            if (target.data('horiz')) {
                target.css({
                    'transition': 'none',
                    'transform': 'translate3d(0px, 100%, 0px)',
                    '-webkit-transform': 'translate3d(0px, 100%, 0px)'
                });
            }
            setTimeout(function () {
                item.css({
                    'transform': 'translate3d(0px, -100%, 0px)',
                    '-webkit-transform': 'translate3d(0px, -100%, 0px)'
                });
                target.css({
                    'transition': 'all 700ms cubic-bezier(0.550, 0.085, 0.000, 0.990)',
                });
                var css = translate('0');
                target.css(css);
            }, 200)

        },
        'nextSlideHorizontal': function (item, index) {
            var target = $(opt.pageContainer).eq(index);
            target.css({
                'transition': 'none',
                'transform': 'translate3d(-100%, 0, 0px)',
                '-webkit-transform': 'translate3d(-100%, 0, 0px)'
            });
            setTimeout(function () {
                item.css({
                    'transform': 'translate3d(100%, 0, 0px)',
                    '-webkit-transform': 'translate3d(100%, 0, 0px)'
                });
                target.css({
                    'transition': 'all 700ms cubic-bezier(0.550, 0.085, 0.000, 0.990)',
                });
                var css = translate_x('0');
                target.css(css);
            }, 200)
        },
        'prevSlideHorizontal': function (item, index) {
            var target = $(opt.pageContainer).eq(index);
            target.css({
                'transition': 'none',
                'transform': 'translate3d(100%, 0, 0px)',
                '-webkit-transform': 'translate3d(100%, 0, 0px)'
            });
            setTimeout(function () {
                item.css({
                    'transform': 'translate3d(-100%, 0, 0px)',
                    '-webkit-transform': 'translate3d(-100%, 0, 0px)'
                });
                target.css({
                    'transition': 'all 700ms cubic-bezier(0.550, 0.085, 0.000, 0.990)',
                });
                var css = translate_x('0');
                target.css(css);
            }, 200)
        },
        'prevSlideVertical': function (item, index) {
            var target = $(opt.pageContainer).eq(index);
            if (target.data('horiz')) {
                target.css({
                    'transition': 'none',
                    'transform': 'translate3d(0px, -100%, 0px)',
                    '-webkit-transform': 'translate3d(0px, -100%, 0px)'
                });
            }
            setTimeout(function () {
                item.css({
                    'transform': 'translate3d(0px, 100%, 0px)',
                    '-webkit-transform': 'translate3d(0px, 100%, 0px)'
                });
                target.css({
                    'transition': 'all 700ms cubic-bezier(0.550, 0.085, 0.000, 0.990)',
                });
                var css = translate('0');
                target.css(css);
            }, 200)

        },
        'prevSlide': function (item) {
            var prevItem = item.prev();
            var current = $(opt.pageContainer).eq(keyIndex);
            if (!current.hasClass("horiz")) {
                hideVer(current);
            }
            else {
                hideHoriz(current);
            }
            if (!item.hasClass("horiz")) {
                //down to up
                prevItem.css({
                    'transform': 'translate3d(0, 0, 0)',
                    '-webkit-transform': 'translate3d(0, 0, 0)'
                });
                item.css({
                    'transform': 'translate3d(0, 100%, 0)',
                    '-webkit-transform': 'translate3d(0, 100%, 0)'
                });

            } else {
                //right to left
                prevItem.css({
                    'transform': 'translate3d(0,0,0)',
                    '-webkit-transform': 'translate3d(0,0,0)'
                });
                item.css({
                    'transform': 'translate3d(100%,0,0)',
                    '-webkit-transform': 'translate3d(100%,0,0)'
                });

            }
            var scrollable = $('.scrollable', prevItem);
            var scrollable_height = scrollable.height();
            var win_height = $(window).height();
            if (scrollable_height < win_height) {
                scrollEnd = true;
                scrollIsTop = true;
            }
        },
        'showSlide': function (item) {
            item.css({ '-webkit-transform': 'scale(1)', 'transform': 'scale(1)' });
            item.next().css(translate('100%'))
        }
    };
    function translate(y) {
        return { '-webkit-transform': 'translate3d(0px, ' + y + ' 0px)', 'transform': 'translate3d(0px, ' + y + ', 0px)' }
    }

    function translate_x(x) {
        return {
            '-webkit-transform': 'translate3d(' + x + ', 0px, 0px)',
            'transform': 'translate3d(' + x + ', 0px, 0px)'
        }
    }
    function hideHoriz(item) {
        item.css({
            'transform': 'translate3d(100%,0,0)',
            '-webkit-transform': 'translate3d(100%,0,0)'
        });
    }
    function hideVer(item) {
        item.css({
            'transform': 'translate3d(0, 100%, 0)',
            '-webkit-transform': 'translate3d(0, 100%, 0)'
        });
    }

    function pageActive() {
        if (opt.refresh && delay && opt.useAnimation) {
            $(opt.pageContainer).eq(keyIndex).find('.step').addClass('hide')
            $(opt.pageContainer).eq(keyIndex).find('.lazy').addClass('hide')
        }
    }

    function urlToObject(url) {
        var urlObject = {};
        if (/\?/.test(url)) {
            var urlString = url.substring(url.indexOf("?") + 1);
            var urlArray = urlString.split("&");
            for (var i = 0, len = urlArray.length; i < len; i++) {
                var urlItem = urlArray[i];
                var item = urlItem.split("=");
                urlObject[item[0]] = item[1];
            }
            return urlObject;
        }
    }

    function handleScrollable(index) {
        var dest = $(opt.pageContainer).eq(index);
        var dest_ch_scrl = dest.find('[data-scroll]');
        if (dest_ch_scrl.length > 0) {
            var div_height = dest_ch_scrl.height();
            var win_height = dest.height();
            if (div_height > win_height) {
                dest_ch_scrl.addClass('scrollable').bind('scroll', chk_scroll);
            }
        }
        else {
            var div_height = dest.height();
            var win_height = $(window).height();
            if (div_height > win_height) {
                dest.addClass('scrollable').bind('scroll', chk_scroll);
            }
        }
    }


    function nextPageV(item, index) {
        direction = 'next';
        var dest = $(opt.pageContainer).eq(index);
        handleScrollable(index);
        if (dest.length) {
            currentItem = dest;
            orderStep(currentItem, direction);
            obj.nextSlideVertical(item, index);
        } else {
            obj.showSlide(item);
        }
        keyindex = dest.index();
        opt.before(dest.index(), direction, dest.index() + 1);
        pageActive()
    }

    function nextPageH(item, index) {
        direction = 'next';
        var dest = $(opt.pageContainer).eq(index);
        handleScrollable(index);
        if (dest.length) {
            currentItem = dest;
            orderStep(currentItem, direction);
            obj.nextSlideHorizontal(item, index);
        } else {
            obj.showSlide(item);
        }
        keyindex = dest.index();
        opt.before(dest.index(), direction, dest.index() + 1);
        pageActive()
    }


    function prevPageV(item, index) {
        direction = 'prev';
        var dest = $(opt.pageContainer).eq(index);
        handleScrollable(index);
        if (dest.length) {
            currentItem = dest;
            orderStep(currentItem, direction);
            obj.prevSlideVertical(item, index);
        } else {
            obj.showSlide(item);
        }
        opt.before(dest.index() + 1, direction, dest.index() + 1);
        keyindex = dest.index();
        pageActive()
    }

    function prevPageH(item, index) {
        direction = 'prev';
        var dest = $(opt.pageContainer).eq(index);
        handleScrollable(index);
        if (dest.length) {
            currentItem = dest;
            orderStep(currentItem, direction);
            obj.prevSlideHorizontal(item, index);
        } else {
            obj.showSlide(item);
        }
        opt.before(dest.index() + 1, direction, dest.index() + 1);
        keyindex = dest.index();
        pageActive()
    }

    function initDom(opt) {
        if (!!opt.speed) {
            $(opt.pageContainer).css({
                'transition-duration': opt.speed + 'ms',
                '-webkit-transition-duration': opt.speed + 'ms'
            });
        }
        slidePage.index(opt.index);

        if (!!opt.useAnimation) {
            var items = $(opt.pageContainer);
            items.find('.step').addClass('hide');
            items.find('.lazy').addClass('hide');
            orderStep(items.eq(opt.index - 1))
        }
    }

    function orderStep(dom, delays) {
        after = true;
        setTimeout(function () {
            delay = delays || delay;
        }, opt.speed || defaultSpeed);
        var steps = $(dom).find('.step');
        steps.each(function (index, item) {
            var time = $(item).attr('data-delay') || 100;
            setTimeout(function () {
                $(item).removeClass('hide')
            }, time)
        })
    }

    function fireAnimate(index) {
        var item = $(opt.pageContainer).eq(index - 1);
        var lazy = item.find('.lazy');
        lazy.each(function (i, item) {
            var time = $(item).attr('data-delay') || 100;
            setTimeout(function () {
                $(item).removeClass('hide')
            }, time)
        })
    }

    function chk_scroll(e) {
        scrollIsTop = false;
        scrollEnd = false;
        var elem = $(e.currentTarget);
        if (elem[0].scrollHeight - elem.scrollTop() == elem.outerHeight()) {
            scrollEnd = true;
        }
        var pos = $('.scrollable').scrollTop();
        if (pos == 0) {
            scrollIsTop = true;
        }

    }

    function initEvent(opt) {
        function wheelFunc(e) {
            var e = e || window.event;
            var hasScroll = $(opt.pageContainer).eq(keyIndex).find('.scrollable')
            if (e.wheelDeltaY < 0 || e.wheelDelta < 0 || e.detail > 0) {
                if (slidePage.stop == false) {
                    if (hasScroll.length > 0) {
                        if (scrollEnd)
                            slidePage.canNext && delay && slidePage.changeHash($(opt.pageContainer).eq(keyIndex + 1).attr('data-anchor'));
                    }
                    else {
                        slidePage.canNext && delay && slidePage.changeHash($(opt.pageContainer).eq(keyIndex + 1).attr('data-anchor'));
                    }
                }

            } else if (e.wheelDeltaY > 0 || e.wheelDelta > 0 || e.detail < 0) {
                if (slidePage.stop == false) {
                    if (hasScroll.length > 0) {
                        if (scrollIsTop)
                            slidePage.canNext && delay && slidePage.changeHash($(opt.pageContainer).eq(keyIndex - 1).attr('data-anchor'));
                    }
                    else {
                        slidePage.canNext && delay && slidePage.changeHash($(opt.pageContainer).eq(keyIndex - 1).attr('data-anchor'));
                    }
                }
            }

        }

        if (!!opt.useWheel) {
            document.onmousewheel = wheelFunc;
            document.addEventListener && document.addEventListener('DOMMouseScroll', wheelFunc, false);
        }
        if (!!opt.useKeyboard) {
            document.onkeydown = function (e) {
                if (e.keyCode == '40' && delay && keyIndex < pageCount - 1) {
                    if (slidePage.stop == false) {
                        slidePage.canNext && slidePage.changeHash($(opt.pageContainer).eq(keyIndex + 1).attr('data-anchor'));
                    }
                } else if (e.keyCode == '38' && delay && keyIndex > 0) {
                    if (slidePage.stop == false) {
                        slidePage.canPrev && slidePage.changeHash($(opt.pageContainer).eq(keyIndex - 1).attr('data-anchor'));
                    }
                }
            }
        }

        var touchY = 0;
        var lastY;
        var move_flag = false;
        document.getElementById('slidePage-container').addEventListener('touchstart', function (e) {
            touchY = e.touches[0].clientY;
            move_flag = false;
        });
        document.getElementById('slidePage-container').addEventListener('touchmove', function (e) {
            lastY = e.touches[0].clientY;
            if (Math.abs(touchY - lastY) > 10)
                move_flag = true;
            else
                move_flag = false;
        });
        document.getElementById('slidePage-container').addEventListener('touchend', function (e) {
            var hasScroll = $(opt.pageContainer).eq(keyIndex).find('.scrollable');
            if (touchY - lastY > 0 && move_flag) {
                if (slidePage.stop == false) {
                    if (hasScroll.length > 0) {
                        if (scrollEnd)
                            slidePage.canNext && delay && slidePage.changeHash($(opt.pageContainer).eq(keyIndex + 1).attr('data-anchor'));
                    }
                    else {
                        slidePage.canNext && delay && slidePage.changeHash($(opt.pageContainer).eq(keyIndex + 1).attr('data-anchor'));
                    }
                }
            }
            else if (move_flag) {
                if (slidePage.stop == false) {
                    if (hasScroll.length > 0) {
                        if (scrollIsTop)
                            slidePage.canNext && delay && slidePage.changeHash($(opt.pageContainer).eq(keyIndex - 1).attr('data-anchor'));
                    }
                    else {
                        slidePage.canNext && delay && slidePage.changeHash($(opt.pageContainer).eq(keyIndex - 1).attr('data-anchor'));
                    }
                }
            }
        });

        $(opt.pageContainer).on('transitionend webkitTransitionEnd', function (event) {
            var removedLength = removedIndex.split(',').length;
            if (after) {
                if (removedLength > 1) {
                    opt.after(direction == 'next' ? keyIndex + 1 : keyIndex + 2, direction, keyIndex + 2);
                } else {
                    opt.after(direction == 'next' ? keyIndex : keyIndex + 2, direction, keyIndex + 1);
                }
                after = false;
            }
        })
    }
})($);

function HashHandler() {
    if (window.location.hash) {
        var target_item = $('[data-anchor=' + window.location.hash.replace('#', '') + ']');
        slidePage.index(target_item.index() + 1);
    } else {
    }
}

window.onload = function () {
    HashHandler();
};

window.addEventListener("hashchange", HashHandler, false);

