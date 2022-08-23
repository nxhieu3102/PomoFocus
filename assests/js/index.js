$(".btn-sb, .btn-lb, .btn-pomo").click(function() {
    $(".pomo-status-btn-active").addClass('pomo-status-btn')
    $(".pomo-status-btn-active").removeClass('pomo-status-btn-active')
    $(this).removeClass("pomo-status-btn")
    $(this).addClass("pomo-status-btn-active")
});

$(".btn-sb").click(function() {
    $('body').css("background-color", "var(--bg-color-sb)")
    $('.header-container').css("border-bottom", "1px solid #448286")
    $('.btn').css("color", "rgb(76, 145, 149)")
});

$(".btn-lb").click(function() {
    $('body').css("background-color", "var(--bg-color-lb)")
    $('.header-container').css("border-bottom", "1px solid #3e6f92")
    $('.btn').css("color", "rgb(69, 124, 163)")
});

$(".btn-pomo" ).click(function() {
    $('body').css("background-color", "var(--bg-color-pomo)")
    $('.header-container').css("border-bottom", "1px solid #c34c48")
    $('.btn').css("color", "rgb(217, 85, 80)")
});

function Start() {

    let timerFunction = () =>{
        let minute = parseInt($('#minute').text());
        let second = parseInt($('#second').text());
        
        second -= 1;
    
        if(second == -1) {
            second = 59;
            minute -= 1;
        }
    
        $('#minute').html(minute)
        $('#second').html(second)
    }
    
    
    setInterval(timerFunction, 1000);


}

$('.btn').click(function() {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'https://pomofocus.io/audios/button-press.wav');
    audioElement.play()

    const text = $('.btn').text()
    if(text == "START") {
        $('.btn').html("STOP")
        $('.btn').css("box-shadow", "none")
        $('.btn').css("top", "6px")
    }

    else {
        $('.btn').html("START")
        $('.btn').css("box-shadow", "rgb(235 235 235) 0px 6px 0px")
        $('.btn').css("top", "0")

    }
    console.log("btn class")
    Start()
})