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
                <h2>{props.bill.name}</h2>
                <p>{props.bill.bill}</p>
                <p>Congress: {props.bill.congress}</p>
            </div>
        </div>
    );
}

class BillView extends React.Component {
    constructor() {
        super();
    }

    render() {
        if(this.props.bill) {
            return (
                <div className="thumbnail">
                    <BillMedia bill={this.props.bill}/>
                    <BillDetails bill={this.props.bill}/>
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
        loadJSONWrapper("/api/v1/bill" + getBill(), function(data) {
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
