class SettingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowImageBlur: false,
            isShowImageAutoPlay: false,
        };
    }

    componentDidMount() {
        let isShowImageBlur = window.localStorage.getItem('isShowImageBlur')
        let isShowImageAutoPlay = window.localStorage.getItem('isShowImageAutoPlay')
        this.setState({
            isShowImageBlur: +isShowImageBlur == 1 ? true : false,
            isShowImageAutoPlay: +isShowImageAutoPlay == 1 ? true : false
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

    render() {
        const { isShowImageBlur, isShowImageAutoPlay } = this.state

        return (
            <div id='container'>
                <antd.Space>
                    <p>图片主页 预览时 是否开启背景模糊</p>
                    <antd.Switch checked={isShowImageBlur}
                                 checkedChildren="开启" unCheckedChildren="关闭"
                                 onChange={this.onChange.bind(this)} />
                </antd.Space>
                <br/>
                <antd.Space>
                    <p>图片主页 预览时 是否自动播放</p>
                    <antd.Switch checked={isShowImageAutoPlay}
                                 checkedChildren="开启" unCheckedChildren="关闭"
                                 onChange={this.onChange2.bind(this)} />
                </antd.Space>
            </div>
        );
    }
}

ReactDOM.render(
    <SettingPage />,
    document.getElementById('app')
);


