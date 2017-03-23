var loadJSONWrapper= function(path, callback) {
  $.ajax({
    url: path,
    dataType: "json",
    success: callback,
    error: function(xhr, textStatus, errorThrown){
        alert("Error reading votes! Skit jaevla fan! : " + textStatus);
    }
  });
}

function VoteData(props) {
  return (
    <tr>
      <td><p>{props.vote.result}</p></td>
      <td><p>{props.vote.chamber}</p></td>
      <td><p>{props.vote.session}</p></td>
      <td><p>{props.vote.roll_call}</p></td>
      <td><a href={"/bills/" + props.vote.bill_id}>{props.vote.bill_id}</a></td>
      <td><p>{props.vote.date}</p></td>
      <td><a href={"/votes/" + props.vote.chamber + "-" + props.vote.session + "-" + props.vote.roll_call}>{props.vote.outcome}</a></td>
    </tr>
  );
}

function VotesData(props) {
  const votes = props.votes.map((vote) =>
      <VoteData vote={vote} key={vote.chamber + "-" + vote.session + "-" + vote.roll_call}/>
  );

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Chamber</th>
            <th>Session</th>
            <th>Roll Call</th>
            <th>Bill</th>
            <th>Date</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {votes}
        </tbody>
      </table>
    </div>
  );
}


class VotesResults extends React.Component {
  constructor() {
    super();
    this.state = {
      votes: []
    };
  }

  componentDidMount() {
    var that = this;
    loadJSONWrapper("/api/v1/votes", function(data) {
      that.updateSearchResults(data);
    });
  }

  updateSearchResults(results) {
    var that = this;
    if(results && results.success === true) {
      that.setState({
        votes: results.data.votes,
      });
    }
    else {
      alert("ELSE2");
    }
  }

  render() {
    return (
      <VotesData votes={this.state.votes} />
    );
  }
}


ReactDOM.render(
  <VotesResults />,
  document.getElementById('search-results')
);
