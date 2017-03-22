var loadJSONWrapper= function(path, callback) {
    $.ajax({
        url: path,
        dataType: "json",
        success: callback,
        error: function(xhr, textStatus, errorThrown){
            alert("Error reading bill: " + textStatus);
        }
    });
}

var getBill = function() {
    return window.location.pathname.substring(window.location.pathname.lastIndexOf('/'));
    // var searchParams = new URLSearchParams(window.location.search);
    // return searchParams.get("id");
}




function BillDetails(props) {
    return (
        <div id="bill-details">
            <div className="caption text-center">
                <h2>{props.bill.title}</h2>
                <p>{props.bill.bill}</p>
                <p>{props.bill.congress}th Congress</p>
            </div>
        </div>

    );
}

function BillTimeline(props) {
    var container = document.getElementById('bill');
    // Create a DataSet (allows two way data-binding)
    var items = new vis.DataSet([
        {id: 1, content: 'Introduced', start: props.bill.introduced_date},
        {id: 2, content: props.bill.actions[0].description, start: props.bill.actions[0].datetime},
        {id: 3, content: props.bill.actions[1].description, start: props.bill.actions[1].datetime},
        {id: 4, content: 'House Passage', start: props.bill.house_passage}
    ]);

    // Configuration for the Timeline
    var options = {};

    // Create a Timeline
    var timeline = new vis.Timeline(container, items, options);
    return (
        <div id="hello"></div>

    )
}

class BillView extends React.Component {
    constructor() {
        super();
    }

    render() {
        if(this.props.bill) {
            return (
                <div className="thumbnail">
                    <BillDetails bill={this.props.bill}/>
                    <BillTimeline bill={this.props.bill}/>
                </div>
            );
        }
        return (<p>No Data</p>);
    }
}












class Bill extends React.Component {
    constructor() {
        super();
        this.state = {
            bill: null
        };
    }

    componentDidMount() {
        var that = this;
        loadJSONWrapper("/api/v1/bills" + getBill(), function(data) {
            that.updateBill(data);
        });
    }

    updateBill(billData) {
        var that = this;
        if(billData && billData.success === true) {
            that.setState({
                bill: billData.data,
            });
        }
        else {
            alert("ELSE2");
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <BillView bill={this.state.bill}/>
                    </div>
                </div>
                {/*
                 <div className="row">
                 <div className="col-sm-12">
                 <div className="panel panel-default">
                 <div className="panel-content" id="person-summary">
                 Summary
                 </div>
                 </div>
                 </div>
                 </div>
                 */}
            </div>

        );
    }

}

// function setOffice(officeIndex) {
//   var office = person["Offices"][officeIndex];
// }

ReactDOM.render(
    <Bill />,
    document.getElementById('bill')
);

// ReactDOM.render(
//   <PersonView />,
//   document.getElementById('person-info-view')
// );
//
// ReactDOM.render(
//   <OfficeView />,
//   document.getElementById('person-office-view')
// );
