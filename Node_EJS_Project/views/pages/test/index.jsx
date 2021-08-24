class TestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        console.log(dataArray)
    }

    /** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Functions */

    render() {
        return (
            <React.Fragment>
                <iframe id="iframe1" className="iframe" src={dataArray[1]}></iframe>


            </React.Fragment>
        );
    }
}

ReactDOM.render(
    <TestPage />,
    document.getElementById('app')
);


