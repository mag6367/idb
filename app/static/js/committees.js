var loadJSONWrapper= function(path, callback) {
  $.ajax({
    url: path,
    dataType: "json",
    success: callback,
    error: function(xhr, textStatus, errorThrown){
        alert("Error reading committees dammit: " + textStatus);
    }
  });
}

function TableHead(props) {

}

function CommitteeData(props) {
  return (
    <tr>
      <td><p>{props.committee.result}</p></td>
      <td><a href={"/committees/" + props.committee.id}>{props.committee.committee}</a></td>
      <td><p>{props.committee.num_results}</p></td>
      <td><a href={"/members/" + props.committee.chairman_id}>{props.committee.chairman_name}</a></td>
      <td><p>{props.committee.chamber}</p></td>
    </tr>
  );
}

function CommitteesData(props) {
  const badname = props.committees.map((committee) =>
      <CommitteeData committee={committee} key={committee.id}/>
  );

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Members</th>
            <th>Chairman</th>
            <th>Chamber</th>
          </tr>
        </thead>
        <tbody>
          {badname}
        </tbody>
      </table>
    </div>
  );
}


class Committees extends React.Component {
  constructor() {
    super();
    this.state = {
      committees: []
    };
  }

  componentDidMount() {
    var that = this;
    loadJSONWrapper("/api/v1/committees", function(data) {
      that.updateCommitteesList(data);
    });
  }

  updateCommitteesList(committeesList) {
    var that = this;
    if(committeesList && committeesList.success === true) {
      that.setState({
        committees: committeesList.data.committees,
      });
    }
    else {
      alert("ELSE2");
    }
  }

  render() {
    return (
      <CommitteesData committees={this.state.committees} />
    );
  }
}


ReactDOM.render(
  <Committees />,
  document.getElementById('search-results')
);
