/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 变量 */
let isShowImageBlur;

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 加载完成 */
$(function () {
    isShowImageBlur = window.localStorage.getItem('isShowImageBlur')
    if (isShowImageBlur == 'true') {
        $('#blur').attr('checked', true)
    }
});

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 方法 */
function change(event) {
    if (isShowImageBlur == 'true') {
        isShowImageBlur = 'false'
    } else {
        isShowImageBlur = 'true'
    }
    window.localStorage.setItem('isShowImageBlur', isShowImageBlur)
    console.log(event.target.value)
}
