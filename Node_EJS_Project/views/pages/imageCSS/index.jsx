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
            listData: [],
            // 弹框
            isShowModal: false,
            modalItem: {},
            modalIndex: 0,
            isShowSetting: false,
            // 设置
            isShowImageBlur: '0',
            isShowImageAutoPlay: '0',
            isShowDelete: '0',
            AutoPlayTime: 5,
            delArray: [],
            // 其它
            columnCount: 5,
        };
    }

    componentDidMount() {
        console.log('AllImagePage');
        let index = getQueryString('index') || 0
        let isShowImageBlur = window.localStorage.getItem('isShowImageBlur')
        let isShowImageAutoPlay = window.localStorage.getItem('isShowImageAutoPlay')
        let AutoPlayTime = window.localStorage.getItem('AutoPlayTime')
        if (+index > dataArray.length - 1) {
            antd.message.warning('下标已超出视频资源数量, 默认从0开始加载')
        }
        const self = this
        this.setState({
            initIndex: +index > dataArray.length - 1 ? 0 : +index,
            currentIndex: +index > dataArray.length - 1 ? 0 : +index,
            isShowImageBlur,
            isShowImageAutoPlay,
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
        const self = this
        const { isShowDelete, delArray } = this.state
        if (+isShowDelete == 1) {
            let inde = delArray.indexOf(item)
            if (inde > -1) {
                delArray.splice(inde, 1);
            } else {
                delArray.push(item)
            }
            this.setState({
                delArray
            })
        } else {
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
    }

    // 删除
    delete(item, event) {
        event.stopPropagation()
        console.log(item)
    }

    // 放大
    imgBig() {
        let columnCount = this.state.columnCount
        if (columnCount - 1 >= 2) {
            columnCount -= 1
            this.setState({
                columnCount
            })
        }
    }

    // 缩小
    imgSmall() {
        let columnCount = this.state.columnCount
        if (columnCount + 1 <= 9) {
            columnCount += 1
            this.setState({
                columnCount
            })
        }
    }

    // 设置
    setting() {
        this.setState({
            isShowSetting: true,
        })
    }

    // 删除导出
    exportFile() {
        const delArray = this.state.delArray
        if (delArray.length == 0) {
            alert('请选择要删除的数据')
            return
        }
        const str = delArray.join(' ')

        // encodeURIComponent 解决中文乱码
        let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);

        // 通过创建 a标签 实现下载
        let link = document.createElement("a");
        link.href = uri;
        link.download = "待删除列表.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // 删除弹框
    alertFile() {
        const delArray = this.state.delArray
        const str = delArray.join(' ')
        if (delArray.length == 0) {
            alert('请选择要删除的数据')
            return
        }
        alert(str)
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
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = null
        }
        if (this.state.isShowSetting) {
            let isShowImageBlur = window.localStorage.getItem('isShowImageBlur')
            let isShowImageAutoPlay = window.localStorage.getItem('isShowImageAutoPlay')
            let isShowDelete = window.localStorage.getItem('isShowDelete')
            let AutoPlayTime = window.localStorage.getItem('AutoPlayTime')
            this.setState({
                isShowImageBlur,
                isShowImageAutoPlay,
                isShowDelete,
                AutoPlayTime: +AutoPlayTime,
            })
        }
        this.setState({
            isShowModal: false,
            isShowSetting: false,
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
            isShowDelete,
            delArray,
            // 其它
            columnCount,
        } = this.state

        return (
            <React.Fragment>
                <div id="container" style={{ columnCount }}>
                    {
                        listData.map((item, index) => {
                            let inde = delArray.indexOf(item)

                            return (
                                <div key={index}
                                     className='itemCon'
                                     onClick={this.itemClick.bind(this, item, index)}>
                                    <img className={ +isShowDelete == 1 && inde > -1 ? 'item itemDel' : 'item'}
                                         src={item} alt='' />
                                    {
                                        +isShowDelete == 1 && inde > -1 ? <p className='itemTag'>已删除</p> : null
                                    }
                                </div>
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
                    <img src="views/images/imgBig.png" alt="放大" onClick={this.imgBig.bind(this)} />
                    <img src="views/images/imgSmall.png" alt="缩小" onClick={this.imgSmall.bind(this)} />
                    <img src="views/images/setting.png" alt="设置" onClick={this.setting.bind(this)} />
                    {
                        +isShowDelete == 1 ? (
                            <React.Fragment>
                                <p onClick={this.exportFile.bind(this)}>{'删除\n导出'}</p>
                                <p onClick={this.alertFile.bind(this)}>{'删除\n弹框'}</p>
                            </React.Fragment>
                        ) : null
                    }
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
                        backgroundImage: +isShowImageBlur == 1 ? `url('${modalItem}')` : ''
                    }}></div>
                    <div id="modalContent" onClick={this.hiddenModal.bind(this)}>
                        <img id="preImg" src="views/images/arrow-left.png" alt="上一张"
                             onClick={this.preImg.bind(this)} />
                        <img id="showImg" src={modalItem} alt="大图" />
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


