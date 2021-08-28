class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 样式
            containerStyle: {
                width: '100%',
                height: '100%',
                minHeight: '200px',
            },
            textStyle: {
                marginBottom: 0,
                fontSize: '18px',
            },
            // 状态
            isShowImageBlur: false,
            isShowImageAutoPlay: false,
            isShowScaleAntD: false,
        };
    }

    componentDidMount() {
        let isShowImageBlur = window.localStorage.getItem('isShowImageBlur')
        let isShowImageAutoPlay = window.localStorage.getItem('isShowImageAutoPlay')
        let isShowScaleAntD = window.localStorage.getItem('isShowScaleAntD')
        this.setState({
            isShowImageBlur: +isShowImageBlur == 1 ? true : false,
            isShowImageAutoPlay: +isShowImageAutoPlay == 1 ? true : false,
            isShowScaleAntD: +isShowScaleAntD == 1 ? true : false,
        })
    }

    onChange(checked) {
        console.log(checked)
        this.setState({
            isShowImageBlur: checked
        })
        window.localStorage.setItem('isShowImageBlur', checked ? '1' : '0')
    }

    onChange2(checked) {
        console.log(checked)
        this.setState({
            isShowImageAutoPlay: checked
        })
        window.localStorage.setItem('isShowImageAutoPlay', checked ? '1' : '0')
    }

    onChange3(checked) {
        console.log(checked)
        this.setState({
            isShowScaleAntD: checked
        })
        window.localStorage.setItem('isShowScaleAntD', checked ? '1' : '0')
    }

    render() {
        const { containerStyle, textStyle, isShowImageBlur, isShowImageAutoPlay, isShowScaleAntD } = this.state

        return (
            <div style={containerStyle}>
                <antd.Space>
                    <p style={textStyle}>预览时 是否开启背景模糊</p>
                    <antd.Switch checked={isShowImageBlur}
                                 checkedChildren="开启" unCheckedChildren="关闭"
                                 onChange={this.onChange.bind(this)} />
                </antd.Space>
                <br/>
                <antd.Space>
                    <p style={textStyle}>预览时 是否自动播放</p>
                    <antd.Switch checked={isShowImageAutoPlay}
                                 checkedChildren="开启" unCheckedChildren="关闭"
                                 onChange={this.onChange2.bind(this)} />
                </antd.Space>
                <br/>
                <antd.Space>
                    <p style={textStyle}>是否使用 And Design 预览</p>
                    <antd.Switch checked={isShowScaleAntD}
                                 checkedChildren="开启" unCheckedChildren="关闭"
                                 onChange={this.onChange3.bind(this)} />
                </antd.Space>
            </div>
        );
    }
}

// 不能用模块导入导出的方式
// 因为,目前的项目是浏览器直接引入了JS,没有经过转化
// const Setting = require('../component/setting')
// import Setting from "../component/setting";
// export default Setting


