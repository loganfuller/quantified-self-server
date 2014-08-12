/** @jsx React.DOM */

var HeartrateGraph = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            events: [],
            bucketSizeSeconds: parseInt(this.props.bucketSizeSeconds),
            startDate: null,
            endDate: null,
            isLoading: false
        };
    },
    updateData: function () {
        var that = this;

        if(this.state.isLoading) {
            return;
        }

        this.setState({isLoading: true}, function() {
            $.get(this.props.dataUrl, {
                bucketSizeSeconds: this.state.bucketSizeSeconds
            }, function (data) {
                that.setState({
                    data: data,
                    isLoading: false
                });
            });
        });
    },
    componentDidMount: function () {
        this.updateData();
    },
    componentDidUpdate: function () {
        var that = this,
            d = {
                data: _.map(that.state.data, function (obj) {
                    return [obj.timestamp, obj.bps];
                }),
                label: "Heartrate (bps)"
            };
        $.plot($("#heartrateChart"), [d], {
            xaxis: {
                mode: "time",
                timezone: "browser"
            },
            selection: {
                mode: "x"
            }
        });
        $.plot($("#heartrateOverviewChart"), [d], {
            series: {
                lines: {
                    show: true,
                    lineWidth: 1
                },
                shadowSize: 0
            }, xaxis: {
                mode: "time",
                timezone: "browser",
                ticks: []
            },
            yaxis: {
                ticks: []
            },
            selection: {
                mode: "x"
            }
        });
    },
    handleBucketButtonClick: function(e) {
        this.setState({bucketSizeSeconds: $(e.target).data("bucket-size")},
            this.updateData);
    },
    render: function () {
        return(
            <div>
                <div className="btn-toolbar" role="toolbar">
                    <div className="btn-group">
                        <button onClick={this.handleBucketButtonClick} type="button" className={"btn btn-default" + (this.state.bucketSizeSeconds === 1 ? " active" : "")} data-bucket-size="1">1s</button>
                        <button onClick={this.handleBucketButtonClick} type="button" className={"btn btn-default" + (this.state.bucketSizeSeconds === 5 ? " active" : "")} data-bucket-size="5">5s</button>
                        <button onClick={this.handleBucketButtonClick} type="button" className={"btn btn-default" + (this.state.bucketSizeSeconds === 30 ? " active" : "")} data-bucket-size="30">30s</button>
                        <button onClick={this.handleBucketButtonClick} type="button" className={"btn btn-default" + (this.state.bucketSizeSeconds === 60 ? " active" : "")} data-bucket-size="60">1m</button>
                        <button onClick={this.handleBucketButtonClick} type="button" className={"btn btn-default" + (this.state.bucketSizeSeconds === 300 ? " active" : "")} data-bucket-size="300">5m</button>
                        <button onClick={this.handleBucketButtonClick} type="button" className={"btn btn-default" + (this.state.bucketSizeSeconds === 900 ? "a ctive" : "")} data-bucket-size="900">15m</button>
                        <button onClick={this.handleBucketButtonClick} type="button" className={"btn btn-default" + (this.state.bucketSizeSeconds === 1800 ? " active" : "")} data-bucket-size="1800">30m</button>
                        <button onClick={this.handleBucketButtonClick} type="button" className={"btn btn-default" + (this.state.bucketSizeSeconds === 3600 ? " active" : "")} data-bucket-size="3600">1h</button>
                    </div>
                    <div className="btn-group">
                        <i onClick={this.updateData} id="heartrateRefresh" className={"fa fa-refresh" + (this.state.isLoading ? " fa-spin" : "")}></i>
                    </div>
                    <div className="btn-group pull-right">
                        <button type="button" className="btn btn-danger">End Date</button>
                    </div>
                    <div className="btn-group pull-right">
                        <button type="button" className="btn btn-danger">Start Date</button>
                    </div>
                </div>
                <div id="heartrateChart" className="metricChart"></div>
                <div id="heartrateOverviewChart" className="overviewChart"></div>
            </div>
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
                            <li className={this.state.activeMetric == "bloodPressure" ? "active" : ""}>
                                <a href="#">Blood Pressure</a>
                            </li>
                            <li className={this.state.activeMetric == "sleep" ? "active" : ""}>
                                <a href="#">Sleep</a>
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


