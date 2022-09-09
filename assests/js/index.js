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

            APP.stopTimer()
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
    { minute: 0, second: "00" }, "1px solid #448286")

const lbBtn = new longBreakButton($(".btn-lb"), "var(--bg-color-lb)", "rgb(69, 124, 163)",
    { minute: 0, second: "00" }, "1px solid #3e6f92")

const pomoBtn = new pomoButton($(".btn-pomo"), "var(--bg-color-pomo)", "rgb(217, 85, 80)",
    { minute: 0, second: "00" }, "1px solid #c34c48")


const APP = {
    shortBreak: sbBtn,
    longBreak: lbBtn,
    pomo: pomoBtn,
    refreshIntervalId: null,
    breakTimes: 1,
    currentStatus: null,
    currentTask: null,
    tasks: [],
    taskId: 0,

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
            const audioElement = document.createElement('audio');
            audioElement.setAttribute('src', 'https://pomofocus.io/audios/button-press.wav');
            audioElement.play()

            const text = $('.btn').text()

            if (text == "START")
                _this.startTimer()
            else _this.stopTimer()
        })
    },

    handleTasks: function () {
        this.handleAddTask()
        this.handleAddProject()
        this.handleEditTask()
        $(".task-info").click(function () {
            $(".task-active").addClass("task")
            $(".task-active").removeClass("task-active")
            $(this).parent().addClass("task-active")
            $(this).parent().removeClass("task")
        })
    },

    handleAddTask: function () {
        const _this = this
        $("#task-title-input").keyup(function () {
            let taskTitle = $("#task-title-input").val()
            if (taskTitle.length > 0) {
                $(".task-manipulation-save").removeAttr("disabled")
                $(".task-manipulation-save").addClass("task-manipulation-save-enable")
                $(".task-manipulation-save").removeClass("task-manipulation-save")
            } else {
                $(".task-manipulation-save-enable").attr("disabled")
                $(".task-manipulation-save-enable").addClass("task-manipulation-save")
                $(".task-manipulation-save-enable").removeClass("task-manipulation-save-enable")
            }
        })

        $("#est-pomo-inc").unbind('click').click(function () {
            const quantity = parseInt($("#est-pomo-input").val()) + 1;
            $("#est-pomo-input").val(quantity)
        })

        $("#est-pomo-des").unbind('click').click(function () {
            const quantity = Math.max(1, parseInt($("#est-pomo-input").val()) - 1);
            $("#est-pomo-input").val(quantity)
        })

        $(".task-manipulation-save").click(function () {
            const taskTitle = $("#task-title-input").val()
            const pomo = $("#est-pomo-input").val()
            let task = { id: _this.taskId++, title: taskTitle, pomoDone: 0, pomoTotal: pomo }
            _this.tasks.push(task)
            _this.renderTask()
            $(".add-task").css("display", "flex")
            $(".add-task-info").css("display", "none")
        })

        $(".task-manipulation-cancle").click(function () {
            $(".add-task").css("display", "flex")
            $(".add-task-info").css("display", "none")

        })

        $(".add-task").click(function () {
            $("#task-title-input").val("")
            $("#est-pomo-input").val("1")
            $(".task-manipulation-save-enable").attr("disabled")
            $(".task-manipulation-save-enable").addClass("task-manipulation-save")
            $(".task-manipulation-save-enable").removeClass("task-manipulation-save-enable")
            $(".add-task-info").css("display", "block")
            $(".add-task").css("display", "none")

        })
    },

    renderTask: function () {
        const _this = this
        let elements = Array.from(document.getElementsByClassName("task"))
        elements.forEach(function (item) {
            item.remove()
        })
        this.tasks.forEach(function (task) {
            $("" +
                `<div class='task' task-id='${task.id}' >` +
                "<div class='task-info'>" +
                "<div class='task-status'></div>" +
                `<div class='task-name'>${task.title}</div>` +
                "</div>" +
                "<div class='task-opt'>" +
                "<div class='task-est-pomo'>" +
                `<p class='pomo-done'>${task.pomoDone}</p>` +
                "/" +
                `<p class='pomo-total'>${task.pomoTotal}</p>` +
                "</div>" +
                "<div class='task-icon-wrap edit-task'>" +
                "<img class='task-icon' src='./assests/image/vertical-ellipsis.png' alt=''>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "").insertBefore(".add-task")
            _this.handleTasks()
        })

    },

    handleEditTask: function () {
        const _this = this
        $(".edit-task").click(function () {
            const task = $(this).closest(".task");
            const id = parseInt(task.attr("task-id"))
            const currentTask = _this.getTaskById(id);
            task.replaceWith(""
                + "<div class='edit-task'>"
                + "<div class='edit-task-info-wrap'>"
                + "<div class='task-title'>"
                + "<input placeholder='What are you working on?' type='text' name='task-title' id='edit-task-title-input' required>"
                + "</div>"
                + "<div class='est-pomo'>"
                + "<p class='est-pomo-title'>Est Pomodoros</p>"
                + "<div class='est-pomo-quantity'>"
                + "<input type='number' min='0' value='1' name='est-pomo' id='edit-task-est-pomo-input' pattern='^[1-9]+[0-9]*$'>"
                + "<button class=' btn-est-pomo' id='edit-task-est-pomo-inc'>"
                + "<img src='./assests/image/caret-up.png' alt='' class='btn-est-pomo-icon'>"
                + "</button>"
                + "<button class=' btn-est-pomo' id='edit-task-est-pomo-des'>"
                + "<img src='./assests/image/caret-down.png' alt='' class='btn-est-pomo-icon'>"
                + "</button>"
                + "</div>"
                + "</div>"
                + "<div class='add-more-info'>"
                + "<button class='add-more-info-btn' id='add-note'>+Add Note</button>"
                + "<textarea name='task-note' id='task-note' cols='30' rows='10'></textarea>"
                + "<button class=' add-more-info-btn' id='add-project'>+Add Project</button>"
                + "</div>"
                + "</div>"
                + "<div class='edit-task-manipulation'>"
                + "<button class='edit-task-manipulation-delete'>Delete</button>"
                + "<button class='edit-task-manipulation-cancle'>Cancle</button>"
                + "<button class='edit-task-manipulation-save-enable'>Save</button>"
                + "</div>"
                + "</div>"
                + "")

            $('#edit-task-title-input').val(currentTask.title)
            $('#edit-task-est-pomo-input').val(currentTask.pomoTotal)
            $('.edit-task').css("display", "block")

            $("#edit-task-est-pomo-input").keyup(function () {
                let taskTitle = $("#edit-task-est-pomo-input").val()
                if (taskTitle.length > 0) {
                    $(".edit-task-manipulation-save").removeAttr("disabled")
                    $(".edit-task-manipulation-save").addClass("edit-task-manipulation-save-enable")
                    $(".edit-task-manipulation-save").removeClass("edit-task-manipulation-save")
                } else {
                    $(".edit-task-manipulation-save-enable").attr("disabled")
                    $(".edit-task-manipulation-save-enable").addClass("edit-task-manipulation-save")
                    $(".edit-task-manipulation-save-enable").removeClass("edit-task-manipulation-save-enable")
                }
            })

            $("#edit-task-est-pomo-inc").unbind('click').click(function () {
                const quantity = parseInt($("#edit-task-est-pomo-input").val()) + 1;
                $("#edit-task-est-pomo-input").val(quantity)
            })

            $("#edit-task-est-pomo-des").unbind('click').click(function () {
                const quantity = Math.max(1, parseInt($("#edit-task-est-pomo-input").val()) - 1);
                $("#edit-task-est-pomo-input").val(quantity)
            })

            $('.edit-task-manipulation-save-enable').click(function () {
                currentTask.title = $('#edit-task-title-input').val()
                currentTask.pomoTotal = parseInt($('#edit-task-est-pomo-input').val())
                $(".edit-task").remove()
                _this.renderTask()

            })

            $('.edit-task-manipulation-cancle').click(function () {
                $(".edit-task").remove()
                _this.renderTask()
            })

            $('.edit-task-manipulation-delete').click(function () {
                _this.tasks = _this.tasks.filter(function(item){
                    return item.id != id;
                })
                $(".edit-task").remove()
                _this.renderTask()
            })

            _this.handleAddTask()
        })
    },

    handleAddProject: function () {

    },

    startTimer: function () {
        const _this = this
        $('.btn').html("STOP")
        $('.btn').css("box-shadow", "none")
        $('.btn').css("top", "6px")
        const task = _this.getCurrentTask()

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
                _this.getCurrentStatus()
                if (_this.currentStatus == "pomo") {
                    if (task != null) {
                        task.pomoDone += 1
                        $(".task-active .pomo-done").text(task.pomoDone)
                    }
                    if (_this.breakTimes % 3 == 0) {
                        _this.breakTimes += 1
                        _this.longBreak.ChangeForm()
                        let time = _this.longBreak.getTime()
                        minute = time.minute
                        second = time.second
                    } else {
                        _this.breakTimes += 1
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

    getCurrentStatus: function () {
        let temp = $('.pomo-status-btn-active').hasClass('btn-pomo')
        if (temp == true) {
            this.currentStatus = "pomo";
            return;
        }

        temp = $('.pomo-status-btn-active').hasClass('btn-sb')
        if (temp == true) {
            this.currentStatus = "shortBreak";
            return;
        }

        temp = $('.pomo-status-btn-active').hasClass('btn-lb')
        if (temp == true) {
            this.currentStatus = "longBreak";
            return;
        }
    },

    getTaskById: function (id) {

        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id == id) {
                return this.tasks[i];
            }
        }
        return null;
    },

    getCurrentTask: function () {
        if (!$(".task-active")[0])
            return null;
        const taskId = parseInt($(".task-active").attr("task-id"))
        let task = null;
        this.tasks.forEach(function (item) {
            if (item.id == taskId) {
                task = item;
            }
        })
        return task;
    },

    start: function () {
        this.handleEventOfButton();
        this.handleTimer();
        this.handleTasks();
    }
}

$(document).ready(function () {
    APP.start()
})