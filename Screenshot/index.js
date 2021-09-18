

$(function () {


});

// 监听键盘事件
$(document).keydown(function(event){
    if (event.keyCode == 13) { // enter
        // 全屏
        if (document.fullscreen) {
            document.cancelFullScreen && document.cancelFullScreen()
            document.webkitCancelFullScreen && document.webkitCancelFullScreen()
        } else {
            document.documentElement.requestFullscreen();
        }
    } else if (event.keyCode == 32) { // backspace
        event.preventDefault()
        imgBig(0.2)
    } else if (event.keyCode == 37) { // arrow left
        imgBig(5)
    } else if (event.keyCode == 38) { // arrow up
        imgBig(1)
    } else if (event.keyCode == 39) { // arrow right
        imgSmall(5)
    } else if (event.keyCode == 40) { // arrow down
        imgSmall(1)
    } else {
        // alert(event.keyCode)
        console.log(event.keyCode)
    }
});

function imgBig(step = 1) {
    let array = document.getElementsByTagName("img");
    for (let i = 0; i < array.length; i++) {
        let img = array[i];
        let heightStr = img.style.height || 80
        let height = parseFloat(heightStr)
        if (height + step <= 100) {
            itemHeight = height + step + 'vh'
            img.style.height = itemHeight
        } else {
            img.style.height = '100vh'
        }
    }
}

function imgSmall(step = 1) {
    let array = document.getElementsByTagName("img");
    for (let i = 0; i < array.length; i++) {
        let img = array[i];
        let heightStr = img.style.height || 80
        let height = parseFloat(heightStr)
        if (height - step >= 5) {
            itemHeight = height - step + 'vh'
            img.style.height = itemHeight
        } else {
            img.style.height = '5vh'
        }
    }
}

