
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

function BillPassage(props) {
    if(props.bill.senate_passage == "" && props.bill.house_passage != "") {
        return (
            <p id="bill-passage">
                {props.bill.house_passage}
            </p>
        )
    }
    else if(props.bill.house_passage == "" && props.bill.senate_passage != "") {
        return (
            <p id="bill-passage">
                {props.bill.senate_passage}
            </p>
        );
    }
    return (
        <p id="bill-passage">
            TBD
        </p>
    );
}

function BillData(props) {
    return (
        <tr>
            <td><p>{props.bill.result}</p></td>
            <td><a href={"/bills/" + props.bill.id}>{props.bill.name}</a></td>
            <td><p>{props.bill.date}</p></td>
            <td><p>{props.bill.primary_subject}</p></td>
            <td><p>{props.bill.chamber}</p></td>
            <td><BillPassage bill={props.bill}/></td>
        </tr>
    );
}

function BillsData(props) {
    const bills = props.bills.map((bill) =>
        <BillData bill={bill} key={bill.id}/>
    );
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Primary Subject</th>
                    <th>Chamber</th>
                    <th>Passage</th>
                </tr>
                </thead>
                <tbody>
                    {bills}
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
