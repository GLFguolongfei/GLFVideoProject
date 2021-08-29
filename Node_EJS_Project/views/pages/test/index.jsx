class TestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        console.log(dataArray)

        let url = dataArray[1]
        fetch(url).then(function(response) {
            console.log(response);
        }, function(error) {
            console.log(error)
        })
    }

    render() {
        return (
            <div id='container'>
                {
                    dataArray.map((item, index) => {
                        return (
                            <div key={index} className='item'>
                                <a href={item}>{item}</a>
                                <iframe src={item}>
                                    <head>
                                        <meta httpEquiv="Content-Type" content="text/html; charset=gb2312" />
                                    </head>
                                </iframe>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

ReactDOM.render(
    <TestPage />,
    document.getElementById('app')
);


