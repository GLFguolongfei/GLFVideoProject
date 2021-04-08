
// 返回 0 ~ 1 之间的随机数
let i = Math.random()
// 把数四舍五入为最接近的整数
i = Math.round(i * 10)
console.log(i)
if (i >0 && i < 10) {
    document.body.style.background = 'white url(views/images/bg' + i + '.jpeg) no-repeat fixed'
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundPosition = 'center'
}


