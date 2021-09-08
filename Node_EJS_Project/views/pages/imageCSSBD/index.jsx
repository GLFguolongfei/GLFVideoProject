class AllImagePage extends React.Component {
    constructor(props) {
        super(props);
        this.timer = null
        this.interval = null
        this.state = {
            initIndex: 0,
            currentIndex: 0,
            // 样式
            modalStyle: {
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: '0',
                left: '0',
                padding: '0',
            },
            // 分页加载
            bodySize: 150,
            pageSize: 15,
            allData: [],
            listData: [],
            // 弹框
            isShowModal: false,
            modalItem: {},
            modalIndex: 0,
            isShowSetting: false,
            // 设置
            isShowImageBlur: '0',
            isShowImageAutoPlay: '0',
            isShowScaleAntD: '0',
            AutoPlayTime: 5,
            // 其它
            itemHeight: 200,
            isLoading: true,
        };
    }

    async componentDidMount() {
        let index = getQueryString('index') || 0
        let isShowImageBlur = window.localStorage.getItem('isShowImageBlur')
        let isShowImageAutoPlay = window.localStorage.getItem('isShowImageAutoPlay')
        let isShowScaleAntD = window.localStorage.getItem('isShowScaleAntD')
        let AutoPlayTime = window.localStorage.getItem('AutoPlayTime')
        if (+index > dataArray.length - 1) {
            antd.message.warning('下标已超出视频资源数量, 默认从0开始加载')
        }

        // 重置数据
        let array = []
        for (let i = index; i < dataArray.length; i++) {
            if (i - index > 150) {
                break;
            }
            let item = dataArray[i]
            let size = {width: 100, height: 100}
            if (i >= +index && i < +index + 150) {
                size = await this.getImgSize(item)
            }
            array.push({
                url: item,
                ...size
            })
        }
        console.log(array)

        const self = this
        this.setState({
            allData: array,
            initIndex: +index > dataArray.length - 1 ? 0 : +index,
            currentIndex: +index > dataArray.length - 1 ? 0 : +index,
            isShowImageBlur,
            isShowImageAutoPlay,
            isShowScaleAntD,
            isLoading: false,
            AutoPlayTime: +AutoPlayTime,
        }, function () {
            self.addMore()
        })
        // 设置标题
        document.title = '图片(' + dataArray.length + ')'
        // 监听键盘事件
        $(document).keydown(function(event){
            if (event.keyCode == 37 || event.keyCode == 38 ) { // arrow up
                self.preImg()
            } else if (event.keyCode == 39 || event.keyCode == 40) { // arrow down
                self.nextImg()
            }
        });
    }

    /** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Functions */
    // type 1加载下一页 2加载全部
    addMore(type = 1) {
        let { initIndex, currentIndex, pageSize, allData = [], listData = [] } = this.state
        // 翻页
        if (currentIndex - initIndex >= 150) {
            let url = window.location.origin + window.location.pathname + '?index=' + currentIndex
            window.location.href = url
            return
        }
        // 加载数据
        currentIndex += pageSize;
        if (allData.length < currentIndex) {
            for (let i = currentIndex-pageSize; i < allData.length; i++) {
                listData.push(allData[i])
            }
        } else {
            for (let i = currentIndex-pageSize; i < currentIndex; i++) {
                listData.push(allData[i])
            }
        }
        // 设置
        const self = this
        this.setState({
            currentIndex,
            listData,
        }, function () {
            if (type == 2 && listData.length < 150) {
                antd.message.success('最多一次加载 ' + (currentIndex - initIndex) + ' / 150 条')
                if (currentIndex - initIndex < 150) {
                    setTimeout(function () {
                        self.addMore(2)
                    }, 500)
                }
            }
        })
    }

    itemClick(item, index) {
        let isShowScaleAntD = this.state.isShowScaleAntD
        if (+isShowScaleAntD == 1) {
            return
        }
        const self = this
        this.setState({
            isShowModal: true,
            modalItem: item,
            modalIndex: self.state.initIndex + index
        })
        if (+this.state.isShowImageAutoPlay == 1) {
            this.interval = setInterval(function () {
                self.nextImg()
            }, this.state.AutoPlayTime * 1000)
        }
    }

    // 删除
    delete(item, event) {
        event.stopPropagation()
        console.log(item)
    }

    // 放大
    imgBig() {
        let itemHeight = this.state.itemHeight
        if (itemHeight + 50 > screenH) {
            itemHeight = screenH
        } else {
            itemHeight += 50;
        }
        this.setState({
            itemHeight,
        })

        if (this.state.listData.length > 60) {
            const self = this
            this.setState({
                isLoading: true,
            })
            setTimeout(function () {
                self.hiddenModal()
            }, 1000)
        }
    }

    // 缩小
    imgSmall() {
        let itemHeight = this.state.itemHeight
        if (itemHeight - 50 > 100) {
            itemHeight -= 50
        } else {
            itemHeight = 100;
        }
        this.setState({
            itemHeight
        })

        if (this.state.listData.length > 60) {
            const self = this
            this.setState({
                isLoading: true,
            })
            setTimeout(function () {
                self.hiddenModal()
            }, 1000)
        }
    }

    // 设置
    setting() {
        this.setState({
            isShowSetting: true,
        })
    }

    // 上一张
    preImg(event) {
        event && event.stopPropagation();
        let allData = this.state.allData || []
        let modalIndex = this.state.modalIndex
        modalIndex--
        if (modalIndex < 0) {
            modalIndex = allData.length - 1
        }
        this.setState({
            modalItem: allData[modalIndex],
            modalIndex
        })
    }

    // 下一张
    nextImg(event) {
        event && event.stopPropagation();
        let allData = this.state.allData || []
        let modalIndex = this.state.modalIndex
        modalIndex++
        if (modalIndex >= allData.length) {
            modalIndex = 0
        }
        this.setState({
            modalItem: allData[modalIndex],
            modalIndex
        })
    }

    // 音频播放
    playAudio() {
        this.timer = snowFlow({
            num: screenW / 35,
            text: "❄"
        });
        $(".snow").show()
    }

    // 音频暂停
    pauseAudio() {
        clearInterval(this.timer)
        this.timer = null
        $(".snow").hide()
    }

    /** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Tools */
    hiddenModal() {
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = null
        }
        if (this.state.isShowSetting) {
            let isShowImageBlur = window.localStorage.getItem('isShowImageBlur')
            let isShowImageAutoPlay = window.localStorage.getItem('isShowImageAutoPlay')
            let isShowScaleAntD = window.localStorage.getItem('isShowScaleAntD')
            let AutoPlayTime = window.localStorage.getItem('AutoPlayTime')
            this.setState({
                isShowImageBlur,
                isShowImageAutoPlay,
                isShowScaleAntD,
                AutoPlayTime: +AutoPlayTime,
            })
        }
        this.setState({
            isShowModal: false,
            isShowSetting: false,
            isLoading: false,
        })
    }

    /** Promise 方式 获取图片尺寸 */
    getImgSize(img_url) {
        return new Promise(function (resolve, reject) {
            // 创建对象
            let img = new Image();
            img.src = img_url;
            img.onload = function() {
                // let message = 'width:' + img.width + ', height:' + img.height
                // console.log(message)
                if (img.width == 100) {
                    debugger
                }
                resolve({
                    width: img.width,
                    height: img.height,
                })
            }
            img.onerror = function () {
                resolve({
                    width: 0,
                    height: 0,
                })
            }
        })
    }

    render() {
        const {
            currentIndex,
            // 样式
            modalStyle,
            // 分页
            listData = [],
            // 弹框
            isShowModal,
            modalItem = [],
            isShowSetting,
            // 设置
            isShowImageBlur,
            isShowScaleAntD,
            // 其它
            itemHeight,
            isLoading,
        } = this.state

        return (
            <React.Fragment>
                <antd.Spin spinning={isLoading}>
                    <div id="container">
                        <antd.Image.PreviewGroup>
                        {
                            listData.map((item, index) => {
                                return (
                                    <div key={index} className='item' style={{
                                        width: item.width * itemHeight / item.height + 'px', /* 高度固定, 计算宽度 */
                                        flexGrow: item.width * itemHeight / item.height, /* 定义项目的放大比例 */
                                    }} onClick={this.itemClick.bind(this, item, index)}>
                                        {/*<img src={item.url} alt="" />*/}
                                        <antd.Image
                                            width={'100%'}
                                            src={item.url}
                                            preview={+isShowScaleAntD == 1}
                                            placeholder=''
                                        />
                                        {/*<antd.Button className='itemBtn' danger onClick={this.delete.bind(this, item)}>*/}
                                        {/*    删除*/}
                                        {/*</antd.Button>*/}
                                    </div>
                                )
                            })
                        }
                        </antd.Image.PreviewGroup>
                    </div>
                </antd.Spin>
                {
                    currentIndex >= dataArray.length - 1 ? null : (
                        <div className="addMore">
                            <button onClick={this.addMore.bind(this, 1)}>加载更多...</button>
                            <button onClick={this.addMore.bind(this, 2)}>加载全部...</button>
                        </div>
                    )
                }
                <div id="buttons">
                    <img src="views/images/imgBig.png" alt="放大" onClick={this.imgBig.bind(this)} />
                    <img src="views/images/imgSmall.png" alt="缩小" onClick={this.imgSmall.bind(this)} />
                    <img src="views/images/setting.png" alt="设置" onClick={this.setting.bind(this)} />
                </div>
                <audio id="audio" src="views/images/此生过半.mp3" loop controls="controls"
                       onPlay={this.playAudio.bind(this)}
                       onPause={this.pauseAudio.bind(this)}>
                </audio>

                {/** 弹框-图片 */}
                <antd.Modal visible={isShowModal} style={modalStyle} bodyStyle={modalStyle}
                            title="" width='100vw'
                            closable={false} footer={null}
                            onCancel={this.hiddenModal.bind(this)}>
                    <div id="modalShow" style={{
                        backgroundImage: +isShowImageBlur == 1 ? `url('${modalItem.url}')` : ''
                    }}></div>
                    <div id="modalContent" onClick={this.hiddenModal.bind(this)}>
                        <img id="preImg" src="views/images/arrow-left.png" alt="上一张"
                             onClick={this.preImg.bind(this)} />
                        <img id="showImg" src={modalItem.url} alt="大图" />
                        <img id="nextImg" src="views/images/arrow-right.png" alt="下一张"
                             onClick={this.nextImg.bind(this)} />
                    </div>
                </antd.Modal>
                {/** 弹框-设置 */}
                <antd.Drawer
                    visible={isShowSetting}
                    title="设置"
                    width='30vw'
                    closable={false}
                    onClose={this.hiddenModal.bind(this)}
                >
                    <Setting />
                </antd.Drawer>
            </React.Fragment>
        );
    }
}

ReactDOM.render(
    <AllImagePage />,
    document.getElementById('app')
);


