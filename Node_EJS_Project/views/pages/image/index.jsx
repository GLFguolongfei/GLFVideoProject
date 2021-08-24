class AllImagePage extends React.Component {
    constructor(props) {
        super(props);
        this.timer = null
        this.interval = null
        this.state = {
            initIndex: 0,
            currentIndex: 0,
            // 分页加载
            bodySize: 150,
            pageSize: 15,
            listData: [],
            // 弹框
            isShowModal: false,
            modalItem: {},
            modalIndex: 0,
            // 其它
            itemHeight: '60vh',
            isShowImageBlur: '0',
            isShowImageAutoPlay: '0',
        };
    }

    componentDidMount() {
        let index = getQueryString('index') || 0
        let isShowImageBlur = window.localStorage.getItem('isShowImageBlur')
        let isShowImageAutoPlay = window.localStorage.getItem('isShowImageAutoPlay')
        if (+index > dataArray.length - 1) {
            antd.message.warning('下标已超出视频资源数量, 默认从0开始加载')
        }
        const self = this
        this.setState({
            initIndex: +index > dataArray.length - 1 ? 0 : +index,
            currentIndex: +index > dataArray.length - 1 ? 0 : +index,
            isShowImageBlur,
            isShowImageAutoPlay,
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
        let { initIndex, currentIndex, pageSize, listData = [] } = this.state
        // 翻页
        if (currentIndex - initIndex >= 150) {
            let url = window.location.origin + window.location.pathname + '?index=' + currentIndex
            window.location.href = url
            return
        }
        // 加载数据
        currentIndex += pageSize;
        if (dataArray.length < currentIndex) {
            for (let i = currentIndex-pageSize; i < dataArray.length; i++) {
                listData.push(dataArray[i])
            }
        } else {
            for (let i = currentIndex-pageSize; i < currentIndex; i++) {
                listData.push(dataArray[i])
            }
        }
        // 设置
        const self = this
        this.setState({
            currentIndex,
            listData,
        }, function () {
            if (type == 2 && dataArray.length - initIndex > 150) {
                antd.message.warning('最多一次加载 ' + (currentIndex - initIndex) + ' / 150 条')
                if (currentIndex - initIndex < 150) {
                    setTimeout(function () {
                        self.addMore(2)
                    }, 500)
                }
            }
        })
    }

    itemClick(item, index) {
        this.setState({
            isShowModal: true,
            modalItem: item,
            modalIndex: index
        })
        if (+this.state.isShowImageAutoPlay == 1) {
            const self = this
            this.interval = setInterval(function () {
                self.nextImg()
            }, 6000)
        }
    }

    // 放大
    imgBig() {
        let itemHeight = this.state.itemHeight
        itemHeight = parseInt(itemHeight)
        if (itemHeight + 10 <= 100) {
            itemHeight = itemHeight + 10 + 'vh'
            this.setState({
                itemHeight
            })
        }
    }

    // 缩小
    imgSmall() {
        let itemHeight = this.state.itemHeight
        itemHeight = parseInt(itemHeight)
        if (itemHeight - 10 >= 10) {
            itemHeight = itemHeight - 10 + 'vh'
            this.setState({
                itemHeight
            })
        }
    }

    // 上一张
    preImg(event) {
        event && event.stopPropagation();
        let modalIndex = this.state.modalIndex
        modalIndex--
        if (modalIndex < 0) {
            modalIndex = dataArray.length - 1
        }
        this.setState({
            modalItem: dataArray[modalIndex],
            modalIndex
        })
    }

    // 下一张
    nextImg(event) {
        event && event.stopPropagation();
        let modalIndex = this.state.modalIndex
        modalIndex++
        if (modalIndex >= dataArray.length) {
            modalIndex = 0
        }
        this.setState({
            modalItem: dataArray[modalIndex],
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
        this.setState({
            isShowModal: false,
        })
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = null
        }
    }

    render() {
        const {
            currentIndex,
            // 分页
            bodySize,
            listData = [],
            // 弹框
            isShowModal,
            modalItem = [],
            modalIndex,
            // 其它
            itemHeight,
            isShowImageBlur,
        } = this.state

        return (
            <React.Fragment>
                <div id="container">
                    {
                        listData.map((item, index) => {
                            return (
                                <img key={index}
                                     className="item"
                                     style={{
                                         height: itemHeight
                                     }}
                                     src={item}
                                     onClick={this.itemClick.bind(this, item, index)} />
                            )
                        })
                    }
                    {
                        currentIndex >= dataArray.length - 1 ? null : (
                            <div className="addMore">
                                <button onClick={this.addMore.bind(this, 1)}>加载更多...</button>
                                <button onClick={this.addMore.bind(this, 2)}>加载全部...</button>
                            </div>
                        )
                    }
                </div>
                <div id="buttons">
                    <img src="views/images/imgBig.png" alt="放大" onClick={this.imgBig.bind(this)} />
                    <img src="views/images/imgSmall.png" alt="缩小" onClick={this.imgSmall.bind(this)} />
                </div>
                <audio id="audio" src="views/images/此生过半.mp3" loop controls="controls"
                       onPlay={this.playAudio.bind(this)}
                       onPause={this.pauseAudio.bind(this)}>
                </audio>
                {
                    // 弹框
                    isShowModal ? (
                        <div id="modal">
                            <div id="modalShow" style={{
                                backgroundImage: +isShowImageBlur == 1 ? `url('${modalItem}')` : ''
                            }}></div>
                            <div id="modalContent" onClick={this.hiddenModal.bind(this)}>
                                <img id="preImg" src="views/images/arrow-left.png" alt="上一张"
                                     onClick={this.preImg.bind(this)} />
                                <img id="showImg" src={modalItem} alt="大图" />
                                <img id="nextImg" src="views/images/arrow-right.png" alt="下一张"
                                     onClick={this.nextImg.bind(this)} />
                            </div>
                        </div>
                    ) : null
                }
            </React.Fragment>
        );
    }
}

ReactDOM.render(
    <AllImagePage />,
    document.getElementById('app')
);

