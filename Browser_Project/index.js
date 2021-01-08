

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 变量 */
var currentEle = "";
var videos = ["1459056880607.mp4","暗恋.mp4","别怕我伤心.mp4","等一分钟.mp4","刚好遇见你.mp4","绝世.mp4","恋人心.mp4","情一动心就痛.mp4","童话镇.mp4","一百个放心.mp4","IMG_0080.mp4","IMG_0656.mp4","Something Just Like This.mp4"];
var isCircul = false;

var html = '';
for (var i = 0; i < videos.length; i++) {
    html += '<video class="item" id="' + i + '" src="sources/' + videos[i] + '" controls loop controlslist="nodownload" preload="metadata" onplay="playVideo(this)" onended="endVideo(this)"></video>';
}
$(".container").append(html);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 方法 */
function playVideo(self) {
    currentEle = self;
    var array = document.getElementsByTagName("video");
    for (var i = 0; i < array.length; i++) {
        var video = array[i];
        if (video == self) {
            video.play();
            video.classList.add("itemCurrent")
            videoCurrent();
            var model = videos[i];
            var title = model.split('.')[0];
            document.title = title;
        } else {
            video.pause();
            video.classList.remove("itemCurrent")
        }
    }
}

function endVideo(self) {
    if (isCircul) {
        let idStr = '0'
        if (parseInt(self.id) + 1 < videos.length) {
            idStr = parseInt(self.id) + 1 + ''  
        } 
        let video = document.getElementById(idStr)
        playVideo(video)
    }
}

function videoCurrent() {
    if (currentEle) {
        var hhhh = $(".container").scrollTop() + $(currentEle).offset().top - $(".container").offset().top;
        hhhh -= 20;
        $(".container").animate({ scrollTop:  hhhh}, 300); 
    } else {
        alert("当前没有正在播放的视频");
    }
}

function videoCircul() {
    isCircul = !isCircul;
    var array = document.getElementsByTagName("video");
    for (var i = 0; i < array.length; i++) {
        var video = array[i];
        video.loop = !isCircul
    }
    var videoCircul = document.getElementById("videoCircul");
    if (isCircul) {
        videoCircul.src = 'images/circulSelect.png'
    } else {
        videoCircul.src = 'images/circul.png'
    }
}



