/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 变量 */
var sourceType = $('.sourceType').text();
var ipUrl = $('.ipUrl').text();
var documentTitle = '图片'


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 加载完成 */
$(function () {
    // 加载资源
    var array = document.getElementsByClassName("ig");

    var i = getQueryString('index') || 0
    i = parseInt(i)

    let init = Math.ceil(Math.random() * array.length)
    $(".ig").eq(init).show().siblings().hide(); // 页面打开之后，第init张图片显示，其余的图片隐藏
    setInterval(function () { // 图片间隔3s轮播一次
        i++;
        if (i > array.length - 1) {
            i = 0;
        }
        $(".ig").eq(i).fadeIn(1500).siblings().fadeOut(1500);
    }, 5000);
    
    // 设置标题
    documentTitle = '图片(' + array.length + ')'
    document.title = documentTitle

    // 飘雪
    snowFlow()
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 工具 */
// 采用正则表达式获取地址栏参数
// alert(getQueryString("password"));
function getQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  decodeURI(r[2]); return null;
}

