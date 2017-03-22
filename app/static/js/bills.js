
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

function TableHead(props) {

}

function BillData(props) {
    return (
        <tr>
            <td><p>{props.bill.result}</p></td>
            <td><p>{props.bill.name}</p></td>
        </tr>
    );
}

function BillsData(props) {
    const committees = props.bills.map((bill) =>
        <BillData bill={bill} key={bill.id}/>
    );
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                </tr>
                </thead>
                <tbody>
                    {committees}
                </tbody>
            </table>
        </div>
    );
}


class Bills extends React.Component {
    constructor() {
        super();
        this.state = {
            bills: []
        };
    }

    componentDidMount() {
        var that = this;
        loadJSONWrapper("/api/v1/bills", function(data) {
            that.updateBillsList(data);
        });
    }

    updateBillsList(billsList) {
        var that = this;
        if(billsList && billsList.success === true) {
            that.setState({
                bills: billsList.data.bills,
            });
        }
        else {
            alert("ELSE2");
        }
    }

    render() {
        return (
            <BillsData bills={this.state.bills} />
        );
    }
}


ReactDOM.render(
    <Bills />,
    document.getElementById('search-results')
);
