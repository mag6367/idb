var loadJSONWrapper= function(path, callback) {
  $.ajax({
    url: path,
    dataType: "json",
    success: callback,
    error: function(xhr, textStatus, errorThrown){
        alert("Error reading committee: " + textStatus);
    }
  });
}

var getCommittee = function() {
  return window.location.pathname.substring(window.location.pathname.lastIndexOf('/'));
  // var searchParams = new URLSearchParams(window.location.search);
  // return searchParams.get("id");
}



function CommitteeDetails(props) {
  return (
    <div id="committee-details">
      <div className="caption text-center">
        <h2>{props.committee.committee}</h2>
        <p>Chamber: {props.committee.chamber}</p>
        <a href={"/members/" + props.committee.chairman_id}>Chair: {props.committee.chairman_id}</a>
      </div>

    </div>
  );
}

function ChairPortrait(props) {
    if(props.committee && props.committee.image) {
        return (<img src={props.committee.image} alt={props.committee.chairman_id} style={{width: 300 + 'px'}}/>);
    }
    return (<img src="/api/v1/americanhero" alt="A sloth for all seasons" style={{width: 300 + 'px'}}/>);
}

class CommitteeView extends React.Component {
  constructor() {
    super();
  }

  render() {
    if(this.props.committee) {
      return (
        <div className="thumbnail">
          <CommitteeDetails committee={this.props.committee}/>
          <ChairPortrait committee={this.props.committee}/>
        </div>
      );
    }
    return (<p>No Data</p>);
  }
}












class Committee extends React.Component {
  constructor() {
    super();
    this.state = {
      committee: null
    };
  }

  componentDidMount() {
    var that = this;
    loadJSONWrapper("/api/v1/committees" + getCommittee(), function(data) {
      that.updateCommittee(data);
    });
  }

  updateCommittee(committeeData) {
    var that = this;
    if(committeeData && committeeData.success === true) {
      that.setState({
        committee: committeeData.data,
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
    				<CommitteeView committee={this.state.committee}/>
    			</div>
    		</div>
        {/*
    		<div className="row">
    			<div className="col-sm-12">
    				<div className="panel panel-default">
    					<div className="panel-content" id="committee-summary">
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
//   var office = committee["Offices"][officeIndex];
// }

ReactDOM.render(
  <Committee />,
  document.getElementById('committee')
);

// ReactDOM.render(
//   <CommitteeView />,
//   document.getElementById('committee-info-view')
// );
//
// ReactDOM.render(
//   <OfficeView />,
//   document.getElementById('committee-office-view')
// );
