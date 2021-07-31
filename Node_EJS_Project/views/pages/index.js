

let i = Math.random() // 返回 0 ~ 1 之间的随机数
i = Math.round(i * 10) // 把数四舍五入为最接近的整数
if (i > 0 && i < 10) {
    document.body.style.background = 'white url(views/images/bg' + i + '.jpeg) no-repeat fixed'
}

let messge = `注意
    本项目所用到的知识点
    1.Node.js
    2.Node.js的EJS模块引擎
    3.Node.js的http静态服务器
    使用本地资源访问视频 , 请使用Chrome浏览器 , Safari浏览器有问题（原因未知）
`
console.log(messge)

