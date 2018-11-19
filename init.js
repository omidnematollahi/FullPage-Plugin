$('#pagination').find('a').eq(0).addClass('active');
slidePage.init({
    /*'index': 1,*/
    before: function (index, direction, target) {
        // console.log(direction)
        // console.log(target)
        if (direction == 'next') {
            if (target == 1) {
                slidePage.fire(2)
            }
            $('#pagination').find('a').removeClass('active').eq(index).addClass('active')
        } else if (direction == 'prev') {
            $('#pagination').find('a').removeClass('active').eq(target - 1).addClass('active')
        }
    },
    after: function (index, direction, target) {
    },
    'useAnimation': true,
    'refresh': true,
    'speed': false,
});