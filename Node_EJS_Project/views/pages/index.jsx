class SettingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
        };
    }

    UNSAFE_componentWillMount() {
        let i = Math.random() // 返回 0 ~ 1 之间的随机数
        i = Math.round(i * 10) // 把数四舍五入为最接近的整数
        if (i > 0 && i < 10) {
            document.body.style.background = 'black url(views/images/bg' + i + '.jpeg) no-repeat center'
        }

        let messge = `注意
            本项目所用到的知识点
            1.Node.js
            2.Node.js的EJS模块引擎
            3.Node.js的http静态服务器
            使用本地资源访问视频 , 请使用Chrome浏览器 , Safari浏览器有问题（原因未知）
        `
        console.log(messge)
    }

    componentDidMount() {
        let url = 'http://127.0.0.1:8090'
        let isIp = getQueryString('ip') || 0
        if (isIp) {
            url = 'http://192.168.2.9:8090'
        }
        this.setState({
            url
        })
    }

    render() {
        const { url } = this.state

        return (
            <div id='container'>
                <a href={`${url}/image?index=0`}>图片主页</a>
                <a href={`${url}/imageCSS?index=0`}>图片主页（样式2）</a>
                <a href={`${url}/video?index=0`}>视频主页</a>
                <a href={`${url}/videoCSS?index=0`}>视频主页（样式2）</a>
                <a href={`${url}/videoDY`}>抖音</a>
                <a href={`${url}/iframe`}>多媒体</a>
                <a href={`${url}/test`}>Test</a>
            </div>
        );
    }
}

ReactDOM.render(
    <SettingPage />,
    document.getElementById('app')
);
