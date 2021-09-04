class AllVideoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initIndex: 0,
            currentIndex: 0,
            // 分页加载
            bodySize: 150,
            pageSize: 15,
            listData: [],
            // 当前播放
            playingIndex: 0,
            // 其它
            itemHeight: '60vh',
            isCircul: false,
        }
    }

    componentDidMount() {
        let index = getQueryString('index') || 0
        if (+index > dataArray.length - 1) {
            antd.message.warning('下标已超出资源数量, 默认从0开始')
        }
        const self = this
        this.setState({
            initIndex: +index > dataArray.length - 1 ? 0 : +index,
            currentIndex: +index > dataArray.length - 1 ? 0 : +index,
        }, function () {
            self.addMore()
        })
        // 设置标题
        document.title = '视频(' + dataArray.length + ')'
        // 监听键盘事件
        $(document).keydown(function(event){
            if (event.keyCode == 38) { // arrow up
                self.preVideo()
            } else if (event.keyCode == 40) { // arrow down
                self.nextVideo()
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

    // 视频播放
    onPlay(item, index) {
        let array = document.getElementsByTagName("video");
        for (let i = 0; i < array.length; i++) {
            let video = array[i];
            if (index == i) {
                video.play();
            } else {
                video.pause();
            }
        }

        this.setState({
            playingIndex: index
        })

        // 设置标题
        let pathArray = item.split('/');
        let name = pathArray[pathArray.length-1];
        let title = name.split('.')[0];
        document.title = (this.state.initIndex + index + 1) + '/' + dataArray.length + '-' + title;
    }

    // 视频放完
    onEnded(item, index) {
        if (this.state.isCircul) {
            this.nextVideo()
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

    // 循环播放
    videoCircul() {
        let isCircul = !this.state.isCircul
        this.setState({
            isCircul
        })
    }

    // 当前播放
    scrollToCurrent() {
        let array = document.getElementsByClassName('itemCurrent') || []
        if (array.length > 0) {
            let ele = array[0]
            ele.scrollIntoViewIfNeeded();
        }
    }

    /** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Tools */
    // 上一首
    preVideo() {
        let index = this.state.playingIndex
        if (index == 0) {
            index = this.state.listData.length
        }
        let idStr = (index - 1).toString()
        console.log(idStr)
        let video = document.getElementById(idStr)
        video.play()
    }

    // 下一首
    nextVideo() {
        let index = this.state.playingIndex
        if (index >= this.state.listData.length - 1) {
            index = -1
        }
        let idStr = (index + 1).toString()
        console.log(idStr)
        let video = document.getElementById(idStr)
        video.play()
    }

    render() {
        const {
            currentIndex,
            // 分页
            listData = [],
            // 当前播放
            playingIndex,
            // 其它
            itemHeight,
            isCircul,
        } = this.state
        let imgSrc = 'views/images/circul.png'
        if (isCircul) {
            imgSrc = 'views/images/circulSelect.png'
        }

        return (
            <React.Fragment>
                <div id="container">
                    {
                        listData.map((item, index) => {
                            return (
                                <video key={index}
                                       className={playingIndex == index ? "itemCurrent" : 'item' }
                                       style={{
                                           height: itemHeight
                                       }}
                                       id={index.toString()}
                                       src={item}
                                       controls
                                       loop={!isCircul}
                                       onPlay={this.onPlay.bind(this, item, index)}
                                       onEnded={this.onEnded.bind(this, item, index)} />
                            )
                        })
                    }
                </div>
                {
                    currentIndex >= dataArray.length - 1 ? null : (
                        <div className="addMore">
                            <button onClick={this.addMore.bind(this, 1)}>加载更多...</button>
                            <button onClick={this.addMore.bind(this, 2)}>加载全部...</button>
                        </div>
                    )
                }
                <div id="buttons">
                    <img id="button1" src="views/images/imgBig.png" alt="放大" onClick={this.imgBig.bind(this)} />
                    <img id="button2" src="views/images/imgSmall.png" alt="缩小" onClick={this.imgSmall.bind(this)} />
                    <img src="views/images/location.png" alt="当前播放位置" id="videoCurrent" onClick={this.scrollToCurrent.bind(this)} />
                    <img src={imgSrc} alt="整体循环播放" id="videoCircul" onClick={this.videoCircul.bind(this)} />
                </div>
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <AllVideoPage />,
    document.getElementById('app')
);

