class TestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        console.log(dataArray)


        var url = dataArray[1]

        fetch(url).then(function(response) {
            console.log(response);
        }, function(error) {
            console.log(error)
        })
    }

    /** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Functions */

    render() {
        return (
            <div id='container'>
                {/*<iframe id="iframe1" className="iframe" src={dataArray[1]}></iframe>*/}
                {
                    dataArray.map((item, index) => {
                        return (
                            <div key={index}>
                                <a href={item}>{item}</a>
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


