var loadJSONWrapper= function(path, callback) {
  $.ajax({
    url: path,
    dataType: "json",
    success: callback,
    error: function(xhr, textStatus, errorThrown){
        alert("Error reading person: " + textStatus);
    }
  });
}

function TableHead(props) {

}

function PersonData(props) {
  return (
    <tr>
      <td><p>{props.person.result}</p></td>
      <td><a href={"/people/" + props.person.id}>{props.person.name}</a></td>
      <td><p>{props.person.current_party}</p></td>
      <td><p>{props.person.state}</p></td>
      <td><p>{props.person.chamber}</p></td>
    </tr>
  );
}

function PeopleData(props) {
  const committees = props.people.map((person) =>
      <PersonData person={person} key={person.id}/>
  );

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Party</th>
            <th>State</th>
            <th>Chamber</th>
          </tr>
        </thead>
        <tbody>
          {committees}
        </tbody>
      </table>
    </div>
  );
}


class People extends React.Component {
  constructor() {
    super();
    this.state = {
      people: []
    };
  }

  componentDidMount() {
    var that = this;
    loadJSONWrapper("/api/v1/people", function(data) {
      that.updatePeopleList(data);
    });
  }

  updatePeopleList(peopleList) {
    var that = this;
    if(peopleList && peopleList.success === true) {
      that.setState({
        people: peopleList.data.people,
      });
    }
    else {
      alert("ELSE2");
    }
  }

  render() {
    return (
      <PeopleData people={this.state.people} />
    );
  }
}


ReactDOM.render(
  <People />,
  document.getElementById('people-search-results')
);
