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
    console.log(event.target.checked)
    isShowImageBlur = isShowImageBlur == 'true' ? 'false' : 'true'
    window.localStorage.setItem('isShowImageBlur', isShowImageBlur)
}
