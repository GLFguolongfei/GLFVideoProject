

var currentEle = "";
var videos = ["1459056880607.mp4","暗恋.mp4","别怕我伤心.mp4","等一分钟.mp4","刚好遇见你.mp4","绝世.mp4","恋人心.mp4","情一动心就痛.mp4","童话镇.mp4","一百个放心.mp4","IMG_0080.mp4","IMG_0656.mp4","Something Just Like This.mp4"];
var html = '';
for (var i = 0; i < videos.length; i++) {
    html += '<video class="itme" src="sources/' + videos[i] + '" controls loop onplay="playVideo(this)"></video>';
}
$(".container").append(html);

function playVideo(self) {
    currentEle = self;
    var array = document.getElementsByTagName("video");
    for (var i = 0; i < array.length; i++) {
        var video = array[i];
        if (video == self) {
            video.play();
            current(true);
            var model = videos[i];
            var title = model.split('.')[0];
            document.title = title;
            video.classList.add("itmeCurrent")
        } else {
            video.pause();
            video.classList.remove("itmeCurrent")
        }
    }
}
function current(isFast) {
    var time = 600;
    if (isFast) {
        time = 300;
    }
    if (currentEle) {
        var hhhh = $(".container").scrollTop() + $(currentEle).offset().top - $(".container").offset().top;
        hhhh -= 20;
        $(".container").animate({ scrollTop:  hhhh}, time); 
    } else {
        alert("当前没有正在播放的视频");
    }
}




