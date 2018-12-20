// $('#pagination').find('a').eq(0).addClass('active');
slidePage.navigationHolder = $("#pagination");
slidePage.init({
    /*'index': 1,*/
    before: function (index, direction, target) {
        if (direction == 'next') {
            if (target == 1) {
                slidePage.fire(2)
            }
            $('#pagination').find('a').removeClass('active').eq(index).addClass('active')
            // console.log(slidePage.currentItem());
        } else if (direction == 'prev') {
            // console.log(slidePage.currentItem());
            $('#pagination').find('a').removeClass('active').eq(target - 1).addClass('active')
        }
        setTimeout(function() {
            $('p').addClass('slide-in-elliptic-right-fwd');
        }, 100)
    },
    after: function (index, direction, target) {
    },
    'useAnimation': true,
    'refresh': true,
    'speed': false,
});