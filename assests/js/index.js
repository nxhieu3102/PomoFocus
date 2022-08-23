class button {
    #btn
    #bgColor
    #color
    #time
    #borderColor

    constructor(btn, bgColor, color, time, borderColor) {
        this.#btn = btn;
        this.#bgColor = bgColor;
        this.#color = color;
        this.#time = time;
        this.#borderColor = borderColor;
    }

    ChangeForm() {
        $(".pomo-status-btn-active").addClass('pomo-status-btn')
        $(".pomo-status-btn-active").removeClass('pomo-status-btn-active')
        this.#btn.removeClass("pomo-status-btn")
        this.#btn.addClass("pomo-status-btn-active")

        $('body').css("background-color", this.#bgColor)
        $('.header-container').css("border-bottom", this.#borderColor)
        $('.btn').css("color", this.#color)
        $('#minute').html(`${this.#time.minute}`)
        $('#second').html(`${this.#time.second}`)
    }

    ClickEvent() {
        let _this = this
        this.#btn.click(function () {
            $(".pomo-status-btn-active").addClass('pomo-status-btn')
            $(".pomo-status-btn-active").removeClass('pomo-status-btn-active')
            _this.#btn.removeClass("pomo-status-btn")
            _this.#btn.addClass("pomo-status-btn-active")

            $('body').css("background-color", _this.#bgColor)
            $('.header-container').css("border-bottom", _this.#borderColor)
            $('.btn').css("color", _this.#color)
            $('#minute').html(`${_this.#time.minute}`)
            $('#second').html(`${_this.#time.second}`)
        })
    }

    getTime() {
        return this.#time;
    }
}
class shortBreakButton extends button {
    constructor(btn, bgColor, color, time, borderColor) {
        super(btn, bgColor, color, time, borderColor)
    }
}
class longBreakButton extends button {
    constructor(btn, bgColor, color, time, borderColor) {
        super(btn, bgColor, color, time, borderColor)
    }
}
class pomoButton extends button {
    constructor(btn, bgColor, color, time, borderColor) {
        super(btn, bgColor, color, time, borderColor)
    }
}

const sbBtn = new shortBreakButton($(".btn-sb"), "var(--bg-color-sb)", "rgb(76, 145, 149)",
    { minute: 1, second: "00" }, "1px solid #448286")

const lbBtn = new longBreakButton($(".btn-lb"), "var(--bg-color-lb)", "rgb(69, 124, 163)",
    { minute: 15, second: "00" }, "1px solid #3e6f92")

const pomoBtn = new pomoButton($(".btn-pomo"), "var(--bg-color-pomo)", "rgb(217, 85, 80)",
    { minute: 1, second: "00" }, "1px solid #c34c48")


const APP = {
    shortBreak: sbBtn,
    longBreak: lbBtn,
    pomo: pomoBtn,
    refreshIntervalId: null,
    breakTimes: 0,
    currentStatus: null,

    handleEventOfButton: function () {
        this.shortBreak.ClickEvent();
        this.longBreak.ClickEvent();
        this.pomo.ClickEvent();
    },

    handleTimer: function () {
        const _this = this
        const time = this.pomo.getTime()

        $('#minute').html(time.minute)
        $('#second').html(time.second)

        $('.btn').click(function () {
            var audioElement = document.createElement('audio');
            audioElement.setAttribute('src', 'https://pomofocus.io/audios/button-press.wav');
            audioElement.play()

            const text = $('.btn').text()

            if (text == "START")
                _this.startTimer()
            else _this.stopTimer()
        })
    },

    startTimer: function () {
        const _this = this
        $('.btn').html("STOP")
        $('.btn').css("box-shadow", "none")
        $('.btn').css("top", "6px")

        let timerFunction = () => {
            let minute = parseInt($('#minute').text());
            let second = parseInt($('#second').text());

            second -= 1;

            if (second == -1) {
                second = 59;
                minute -= 1;
            }

            if (second < 10) {
                second = "0" + second;
            }

            if (minute == -1) {
                _this.stopTimer()
                _this.breakTimes += 1
                _this.getCurrentStatus()

                if (_this.currentStatus != pomo) {
                    if (_this.breakTimes % 3 == 0) {
                        _this.longBreak.ChangeForm()
                        let time = _this.longBreak.getTime()
                        minute = time.minute
                        second = time.second
                    } else {
                        _this.shortBreak.ChangeForm()
                        let time = _this.shortBreak.getTime()
                        minute = time.minute
                        second = time.second
                    }
                } else {
                    _this.pomo.ChangeForm()
                    let time = _this.pomo.getTime()
                    minute = time.minute
                    second = time.second
                }
            }

            $('#minute').html(minute)
            $('#second').html(second)
        }

        this.refreshIntervalId = setInterval(timerFunction, 1000);
    },

    stopTimer: function () {
        $('.btn').html("START")
        $('.btn').css("box-shadow", "rgb(235 235 235) 0px 6px 0px")
        $('.btn').css("top", "0")
        clearInterval(this.refreshIntervalId)
    },

    start: function () {
        this.handleEventOfButton();
        this.handleTimer();
    },

    getCurrentStatus: function () {
        let temp = $('.pomo-status-btn-active').hasClass('.btn-pomo')
        if (temp == true) {
            this.currentStatus = "pomo";
            return;
        }

        temp = $('.pomo-status-btn-active').hasClass('.btn-sb')
        if (temp == true) {
            this.currentStatus = "shortBreak";
            return;
        }

        temp = $('.pomo-status-btn-active').hasClass('.btn-lb')
        if (temp == true) {
            this.currentStatus = "longBreak";
            return;
        }
    }
}

$(document).ready(function () {
    APP.start()
})

