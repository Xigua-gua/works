
var log = function() {
    console.log.apply(console, arguments)
}

var urlarray = ["../images/1.jpg","../images/2.jpg","../images/3.jpg"]

// 设置显示宽度
var changeWidth = function(width) {
    return $('.slide-container').css('width',width)
}

// 插入图片
var imgString = function(urlarray) {
    var images = ''
    for (var i = 0; i < urlarray.length; i++) {
        var img = `<img  src=${urlarray[i]} alt="" />`
        images += img
    }
    return images
}
var insertImages = function(urlarray) {
    var images = imgString(urlarray)
    // log(images)
    var num = urlarray.length
    $('.slide-images').append(images)
    $('.slide-images>img').attr('class','slide-img')
    $('.slide-images').attr('data-imgs', `${num}`)
    $('.slide-img:first').addClass('slide-img-show')
}


// 插入缩略图
var insertMinimgs = function() {
    var miniwidth = $('.slide-container').width() / 8
    log(miniwidth)
    var minishow = `<style>
                        .mini-show {
                            width: ${miniwidth * 1.2}px;
                        }
                    </style>`
    var images = imgString(urlarray)
    $('.slide-minimages').append(images)
    $('.slide-minimages>img').attr('class','mini-img')
    $('.mini-img').attr('width', miniwidth)
    $('head').append(minishow)
    $('.mini-img:first').addClass('mini-show')
}

// 插入指示标
var insertIndicators = function() {
    var len = $('.slide-img').length
    for (var i = 1; i <= len; i++) {
        $('.slide-indicators').append(`<span class="slide-indicator">${i}</span>`)
    }
    $('.slide-indicator:first').addClass('slide-indicator-show')
}

var autoplay = function(){
    return setInterval(function(){
        playNext()}, 2000)
}
//鼠标移入图像 显示指示标
var bindEventShow = function() {
    var clear = autoplay();
    $('.slide-container').hover(function(event){
        if (event.type === 'mouseenter') {
            clearInterval(clear);
            $('.slide-button').css('display', 'block')
        }else {
            clear = autoplay();
            $('.slide-button').css('display', 'none')
        }
    })
}

// 鼠标移动到对应的缩略图 切换图片
// 问题出在这里, 我点击图片playNext 和 palyPrev 切换按钮没有这个问题,
//
var bindEventMini = function() {
    // $('.mini-img')是 所有缩略图的 类
    $('.mini-img').on('mouseenter', function(event){
        var button = $(event.target)
        // 'mini-show' 是我给目标缩略图 加的样式
        if(!button.hasClass('mini-show')){
            var i = button.index()
            $('.mini-img').removeClass('mini-show')
            button.addClass('mini-show')
            // 给图片下标 更新样式
            $('.slide-indicator-show').removeClass('slide-indicator-show')
            var activeIndicator = $($('.slide-indicator')[i])
            activeIndicator.addClass('slide-indicator-show')
            // 给对应的 图像更新 样式
            $('.slide-images').data('show', i)
            // $('.slide-img-show').fadeOut()
            $('.slide-img-show').removeClass('slide-img-show')
            var active = $($('.slide-img')[i])
            active.addClass('slide-img-show')
            // active.fadeIn()
        }
    })
}

var play = function(offset) {
    var activeIndex = $('.slide-images').data('show')
    var numberOfImgs = $('.slide-images').data('imgs')
    var i = (activeIndex + numberOfImgs + offset) % numberOfImgs
    // 修改 $('.gua-slide-images') 的 data-active的值 为 i
    $('.slide-images').data('show', i)
    //淡出
    $('.slide-img-show').fadeOut()
    $('.slide-img-show').removeClass('slide-img-show')
    //淡入
    var active = $($('.slide-img')[i])
    active.addClass('slide-img-show')
    active.fadeIn()
    // 改变指示器 和 mini 图像
    $('.mini-show').removeClass('mini-show')
    var activeMini = $($('.mini-img')[i])
    activeMini.addClass('mini-show')
    $('.slide-indicator-show').removeClass('slide-indicator-show')
    var activeIndicator = $($('.slide-indicator')[i])
    activeIndicator.addClass('slide-indicator-show')
}
var playPrev = function() {
    play(-1)
}
var playNext = function() {
    play(1)
}

// 点击指示标切换图像
var bindEventButton = function() {
    $('.slide-button').on('click', function(event){
        //log('123')
        var button = $(event.target)
        if (button.hasClass('slide-button-left')) {
            playPrev()
        } else {
            playNext()
        }
    })
}
// var autoplay = function() {
//     setInterval(playNext,2000)
// }
// clearInterval(autoplay)

var allSlide = function (width, urlarray) {
    changeWidth(width)
    insertImages(urlarray)
    insertMinimgs()
    insertIndicators()
    bindEventShow()
    bindEventButton()
    bindEventMini()
}
