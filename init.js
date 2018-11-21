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
            // console.log(index);
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

$('.responsive').slick({
    centerMode: true,
    dots: true,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});