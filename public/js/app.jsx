/** @jsx React.DOM */

var HeartrateGraph = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            events: [],
            bucketSizeSeconds: parseInt(this.props.bucketSizeSeconds)
        };
    },
    updateData: function () {
        var that = this;
        $.get(this.props.dataUrl, {
            bucketSizeSeconds: this.state.bucketSizeSeconds
        }, function (data) {
            that.setState({
                data: data
            });
        });
    },
    componentDidMount: function () {
        this.updateData();
    },
    componentDidUpdate: function () {
        var that = this,
            i = 0;
        $.plot($("#heartrateChart"), [_.map(that.state.data, function (obj) {
            return [i++, obj.bps];
        })]);
    },
    render: function () {
        return(
            <div id="heartrateChart"></div>
        );
    }
});

var App = React.createClass({
    getInitialState: function () {
        return {
            activeMetric: "heartrate"
        };
    },
    componentDidMount: function () {
        return;
    },
    render: function () {
        return(
            <div>
                <div className="page-header">
                    <h1>Quantified Self</h1>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <ul className="nav nav-pills nav-stacked">
                            <li className={
                                this.state.activeMetric == "heartrate" ? "active" : ""}>
                                <a href="#">Heartrate</a>
                            </li>
                            <li className={this.state.activeMetric == "medication" ? "active" : ""}>
                                <a href="#">Medication</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-9">
                        <HeartrateGraph
                            dataUrl="/api/heartrate"
                            bucketSizeSeconds="300"
                        />
                    </div>
                </div>
            </div>
        );
    }
});

React.renderComponent(
    <App />,
    document.getElementById("container")
);


