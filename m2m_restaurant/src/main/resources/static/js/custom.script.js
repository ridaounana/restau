(function($) {
    "use strict";

    var html5elmeents = "nav|article|figure|figcaption|footer|header|section".split('|');
    var bigSliderImages = [];
    var shift = $(window).width() > 640 ? 400 : 150;
    var active = '';


    for (var i = 0; i < html5elmeents.length; i++) {
        document.createElement(html5elmeents[i]);
    }


    /*-----------------------------------------------------------------------------------*/
    /*	Mobile Detect
    /*-----------------------------------------------------------------------------------*/

    var testMobile;
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    $(window).load(function() {
        if (isMobile.any()) {

            $('.animate, .fade, .rotate').removeClass('animate fade rotate');

        } else {
            $('.calc').each(function() {
                var val = $(this).text();
                $(this).attr('data-value', val);
                $(this).text(0);
            })
        }


        /*----------  PRELOADER  ----------*/
        setTimeout(function() {
            $('#preloader').animate({
                'opacity': '0'
            }, 300, function() {
                $('#preloader').hide();
                if (0 < $(window).scrollTop()) {
                    scrolling();
                }
            });
            $('.page-wrapper').animate({
                'opacity': '1'
            }, 500);
        }, 800);
        /*----------  //PRELOADER  ----------*/


        /*----------  PARALLAX  ----------*/
        function parallaxInit() {
            testMobile = isMobile.any();
            if (testMobile == null) {
                $('.parallax').parallax("50%", 0.5);
            }
        }
        parallaxInit();
        /*----------  //PARALLAX  ----------*/

        /*----------  SMALL SLIDER  ----------*/
        $('.comment .flexslider, .events .flexslider').flexslider({
            slideshowSpeed: 6000
        });

        $('.flex-next').addClass('glyph fa-angle-right').text('');
        $('.flex-prev').addClass('glyph fa-angle-left').text('');
        /*----------  SMALL SLIDER  ----------*/

        /*----------  BIG SLIDER  ----------*/

        setTimeout(function() {
                $('.home .flexslider').height($(window).height()).flexslider({
                    slideshowSpeed: 6000,
                    after: function(slider) {
                        $('.home .flexslider .big, .home .flexslider .middle, .home .flexslider .dot, .home .flexslider p').css('opacity', 0);
                        var next = $('.flex-active-slide', slider).find('.slider-text-wrapper');
                        var index = $('.flex-active-slide', slider).index();
                        var nextImg = '';
                        var prevImg = '';

                        sliderAnimate(next);


                        if (bigSliderImages.length - 1 == index) {
                            nextImg = bigSliderImages[0];
                        } else {
                            nextImg = bigSliderImages[index + 1];
                        }

                        if (index == 0) {
                            prevImg = bigSliderImages[bigSliderImages.length - 1];
                        } else {
                            prevImg = bigSliderImages[index - 1];
                        }

                        $('.home .flex-prev, .home .flex-next').css('opacity', 0);
                        setTimeout(function() {
                            $('.home .flex-prev').html('<img src="' + prevImg + '" alt="">');
                            $('.home .flex-next').html('<img src="' + nextImg + '" alt="">');
                            $('.home .flex-prev, .home .flex-next').css('opacity', 1);
                        }, 300)
                    }
                });

                sliderAnimate($('.flex-active-slide .slider-text-wrapper'));

                function sliderAnimate(next) {
                    if (next.hasClass('first')) {
                        var time = 0;

                        $('.middle, .big, .dot, p', next).each(function() {
                            var thiz = $(this);
                            time += 200;
                            setTimeout(function() {
                                thiz.addClass('fadeInDown animated').css('opacity', '1');
                                thiz.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                                    thiz.removeClass('fadeInDown animated');
                                });
                            }, time);
                        });
                    } else if (next.hasClass('second')) {
                        var time = 0;

                        $('.middle, .big, .dot, p', next).each(function() {
                            var thiz = $(this);
                            time += 300;
                            setTimeout(function() {
                                thiz.addClass('flipInX animated').css('opacity', '1');
                                thiz.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                                    thiz.removeClass('flipInX animated');
                                });
                            }, time);
                        });
                    } else if (next.hasClass('third')) {
                        var time = 0;

                        $('.middle, .big, .dot, p', next).each(function(i) {
                            var thiz = $(this);
                            time += 300;
                            if (i == 0) {
                                setTimeout(function() {
                                    thiz.addClass('rotateInDownLeft animated').css('opacity', '1');
                                    thiz.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                                        thiz.removeClass('rotateInDownLeft animated');
                                    });
                                }, time);
                            } else if (i == 1) {
                                setTimeout(function() {
                                    thiz.addClass('fadeInLeft animated').css('opacity', '1');
                                    thiz.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                                        thiz.removeClass('fadeInLeft animated');
                                    });
                                }, time);
                            } else {
                                setTimeout(function() {
                                    thiz.addClass('pulse animated').css('opacity', '1');
                                    thiz.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                                        thiz.removeClass('pulse animated');
                                    });
                                }, time);
                            }
                        });
                    }
                }

                $('.home li > img').each(function() {
                    bigSliderImages.push($(this).attr('src'))
                })


                $('.home .flex-next').html('<img src="' + bigSliderImages[1] + '" alt="">');
                $('.home .flex-prev').html('<img src="' + bigSliderImages[bigSliderImages.length - 1] + '" alt="">');

                $('.home li > img').each(function() {
                    $(this).css('background-image', 'url(' + $(this).attr('src') + ')')
                        .attr('src', '../images/1x1.png')
                        .height($(window).height());
                });
            }, 0)
            /*----------  //BIG SLIDER  ----------*/


        /*----------  NAVIGATION ON PAGE  ----------*/
        $('#mainNavi a, .slide-page').on('click', function() {
            var id = $(this).attr('href');
            if (id == '#home') {
                $('html,body')
                    .stop()
                    .scrollTo(0, 500);

                return false
            }
            $('html,body')
                .stop()
                .scrollTo($(id).offset().top - 60, 500);
            if (!$(this).hasClass('button')) {
                $('#mainNavi a').removeClass('active');
                $(this).addClass('active');
            }
            return false
        });

        $('#moveTop').on('click', function() {
            $('html,body')
                .stop()
                .scrollTo(0, 1000);

            return false
        });

        /*----------  //NAVIGATION ON PAGE  ----------*/
        function scrolling() {
            var scroll = $(window).scrollTop() + $(window).height();

            /*----------  ANIMATION FOR HEADER  ----------*/
            if ($(window).scrollTop() < $(window).height()) {
                $('#mainNavi a').removeClass('active');
                $("#mainNavi a:eq(0)").addClass('active');
            }
            /*----------  //ANIMATION FOR HEADER  ----------*/

            /*----------  ANIMATION FOR APPLICATION  ----------*/
            if (parseInt($('#application').offset().top) + shift < scroll) {
                if ($('#application').hasClass('animate')) {

                    $('#application').removeClass('animate');

                    $('#application .restaurant-block').eq(0).addClass('bounceInLeft animated');
                    $('#application .restaurant-block').eq(0).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                        $('#application .restaurant-block').eq(0).removeClass('bounceInLeft animated');
                    });

                    $('#application .restaurant-block').eq(1).addClass('bounceInRight animated');
                    $('#application .restaurant-block').eq(1).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                        $('#application .restaurant-block').eq(1).removeClass('bounceInRight animated');
                    });
                }

                $('#mainNavi a').removeClass('active');
                $("a[href='#application']:eq(0)").addClass('active');
            }
            /*----------  //ANIMATION FOR APPLICATION  ----------*/

            /*----------  ANIMATION FOR MENU  ----------*/
            if (parseInt($('#home').offset().top) + shift < scroll) {
                if ($('#menu').hasClass('animate')) {

                    $('#menu').removeClass('animate');

                    var time = -200;
                    $('#menu .menu-block').each(function() {
                        time += 200;
                        var thiz = this;
                        setTimeout(function() {
                            $(thiz).addClass('fadeInLeft animated').css('opacity', 1);
                            $(thiz).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                                $(thiz).removeClass('fadeInLeft animated');
                            });
                        }, time)
                    })
                }

                $('#mainNavi a').removeClass('active');
                $("a[href='#menu']:eq(0)").addClass('active');
            }
            /*----------  //ANIMATION FOR MENU  ----------*/


        }

        $(window).on('scroll', function() {
            if (!isMobile.any()) {
                scrolling();
            }
        });


        $('.menu-block').on('mouseenter', function() {
            $('.position', this).addClass('fadeInDown animated');
            $('.position', this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $('.position', this).removeClass('fadeInDown animated');
            });
            $('.food-name', this).addClass('fadeInDown animated');
            $('.food-name', this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $('.food-name', this).removeClass('fadeInDown animated');
            });
            $('.price', this).addClass('fadeInUp animated');
            $('.price', this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $('.price', this).removeClass('fadeInUp animated');
            });

        }).on('mouseleave', function() {
            $('.position', this).removeClass('fadeInDown animated');
            $('.food-name', this).removeClass('fadeInDown animated');
            $('.price', this).removeClass('fadeInUp animated');
        });

        $('.menu-block').on('click', function() {
            active = $(this);

            var img = $('img', active);
            var position = $('.position', active);
            var name = $('.food-name', active);
            var text = $('p', active);

            if (active.index() == 0) {
                $('#popup .prev').addClass('unactive');
            } else if (active.index() == $('.menu-block').length - 1 || active.index() == 7 || active.index() == 11) {
                $('#popup .next').addClass('unactive');

            }

            $('#popup img').attr('src', img.attr('src').replace(/food/, 'food/big'));
            $('#popup .position').html(position.html());
            $('#popup .food-name').html(name.html());
            $('#popup p').html(text.html());

            $('#popup').show();

            $('#popup').css('opacity', 1);

            setTimeout(function() {
                $('#popup article').eq(0).addClass('fadeInLeft animated').css('opacity', 1);
                $('#popup article').eq(0).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $('#popup article').eq(0).removeClass('fadeInLeft animated');
                });

                $('#popup article').eq(1).addClass('fadeInRight animated').css('opacity', 1);
                $('#popup article').eq(1).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $('#popup article').eq(1).removeClass('fadeInRight animated');
                });

            }, 500);
            setTimeout(function() {
                $('#popup .button').addClass('fadeInDown animated').css('opacity', 1);
                $('#popup .button').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $('#popup .button').removeClass('fadeInDown animated');
                });
            }, 1000);
        });
        $('.close-button').on('click', function() {
            $('#popup article, #popup .button').css('opacity', 0);
            active = '';
            setTimeout(function() {
                $('#popup').hide()
                $('#popup .next, #popup .prev').removeClass('unactive');
            }, 500);
            return false;
        });
        $('#popup .next, #popup .prev').on('click', function() {
            var activeTemp = $(this).hasClass('prev') ? active.prev() : active.next();
            if (!activeTemp.length || !flag) {
                if (!activeTemp.length) {
                    $(this).addClass('unactive');
                }
                return false;
            }
            $('#popup .next, #popup .prev').removeClass('unactive');
            flag = false;
            var img = $('img', activeTemp);
            var position = $('.position', activeTemp);
            var name = $('.food-name', activeTemp);
            var text = $('p', activeTemp);
            $('.details-wrapper > *, #popup img').css('opacity', 0);

            setTimeout(function() {
                $('#popup img').attr('src', img.attr('src').replace(/food/, 'food/big')).css('opacity', 1);
            }, 500);

            setTimeout(function() {
                $('#popup .position').html(position.html());
                $('#popup .food-name').html(name.html());
                $('#popup p').html(text.html());

                var time = 100;
                $('.details-wrapper > *').each(function() {
                    time += 200;
                    var thiz = this;
                    setTimeout(function() {
                        $(thiz).addClass('fadeInDown animated').css('opacity', 1);
                        $(thiz).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                            $(thiz).removeClass('fadeInDown animated');
                        });
                    }, time)
                });
                setTimeout(function() {
                    flag = true;
                }, 900);
            }, 300)


            active = activeTemp;

            return false
        });

        $('.more-food').on('click', function() {
            if ($(this).hasClass('unactive')) {
                return false;
            }
            $(this).addClass('animate');

            var amount = 4;
            var width = $(window).width();

            if (width <= 480) {
                var amount = 4;
            } else if (width < 768) {
                var amount = 2;
            } else if (width < 990) {
                var amount = 3;
            } else {
                var amount = 4;
            }

            var time = -200;
            setTimeout(function() {
                $('.more-food').removeClass('animate');
                $('.menu-block.animate').each(function(i) {
                    if (i >= amount) {
                        return false;
                    }
                    time += 200;
                    var thiz = this;
                    $(this).show();
                    if (i == 0) {
                        $('html,body')
                            .stop()
                            .scrollTo($(this).offset().top, 300);
                    }
                    setTimeout(function() {
                        $(thiz).addClass('fadeInLeft animated').removeClass('animate').css('opacity', 1);
                        $(thiz).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                            $(thiz).removeClass('fadeInLeft animated');
                        });
                        if (!$('.menu-block.animate').length) {
                            $('.more-food').addClass('unactive');
                        }
                    }, time);
                });
            }, 1000);

            return false;
        })


        $('.images-bg').each(function() {
            $(this).css({
                'background-image': 'url(' + $('>img', this).hide().attr('src') + ')'
            });
        });



        var width = $(window).width();

        if (width < 768) {
            var amount = 3;
        } else if (width < 990) {
            var amount = 5;
        } else {
            var amount = 7;
        }

        $('.menu-block').each(function(i) {
            if (i > amount) {
                $(this).addClass('animate');
            }
        })

        $('.mobile-menu').on('click', function() {
            $('#mainNavi').toggleClass('animate');
        });


       

    });



})(jQuery);