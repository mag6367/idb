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

function CommitteePortrait(props) {
  if(props.committee && props.committee.image) {
    return (
      <img src={props.committee.image} alt={props.committee.name} style={{width: 300 + 'px'}}/>
    );
  }
  return (
    <img src="/api/v1/americanhero" alt="A sloth for all seasons" style={{width: 300 + 'px'}}/>
  );
}

function CommitteeLifespan(props) {
  if(false && props.committee.IsDeceased) {
    return (
      <p id="committee-lifespan">
        {props.committee.DateBorn} - {props.committee.DateDied}
      </p>
    );
  }
  return (
    <p id="committee-lifespan">
      {props.committee.date_of_birth} - Present
    </p>
  );
}

function CommitteeDetails(props) {
  return (
    <div id="committee-details">
      <div className="caption text-center">
        <h2>{props.committee.name}</h2>
        <p>Party affiliation: {props.committee.current_party}</p>
        <CommitteeLifespan committee={props.committee}/>
        <a href={props.committee.url}>Website</a>
      </div>
      <div className="caption text-center">
        <p>Twitter Handle: {props.committee.twitter_account ? (<a href={"http://www.twitter.com/" + props.committee.twitter_account}>{"@" + props.committee.twitter_account}</a>) : ("None")}</p>
        <p>Facebook Account: {props.committee.facebook_account ? (<a href={"http://www.facebook.com/" + props.committee.facebook_account}>{props.committee.facebook_account}</a>) : ("None")}</p>
        <p>Youtube Account: {props.committee.youtube_account ? (<a href={"http://www.youtube.com/user/" + props.committee.youtube_account}>{props.committee.youtube_account}</a>) : ("None")}</p>
      </div>
    </div>
  );
}

class CommitteeView extends React.Component {
  constructor() {
    super();
  }

  render() {
    if(this.props.committee) {
      return (
        <div className="thumbnail">
          <CommitteePortrait committee={this.props.committee}/>
          <CommitteeDetails committee={this.props.committee}/>
        </div>
      );
    }
    return (<p>No Data</p>);
  }
}

function ElectionData(props) {
  return (
    <div id="election-data">
      <p>Last Elected: {props.office.start_date}</p>
      <p>Next Election: {props.office.end_date}</p>
    </div>
  );
}

function CommitteeData(props) {
  return (
      <tr>
        <td><a href={"/committees/" + props.committee.code}>{props.committee.name}</a></td>
      </tr>
  );
}

function CommitteesData(props) {
  const committees = props.committees.map((committee) =>
    <CommitteeData committee={committee} key={committee.code} />
  );

  return (
    <div className="table-responsive">
    <table className="table table-striped">
      <thead>
        <tr><th>Committees:</th></tr>
      </thead>
      <tbody>
        {committees}
      </tbody>
    </table>
    </div>
  );
}



function DistrictData(props) {
  if(props.office.district) {
    return (
      <div className="district-data">
        <p>District: {props.office.district}</p>
      </div>
    );
  }
  return null;
}

function OfficeData(props) {
  return(
    <div className="office-data">
      <h4>Office: {props.office.title}, {props.office.chamber}</h4>
      <p>State: {props.office.state} </p>
      <DistrictData office={props.office}/>
      <ElectionData office={props.office}/>
    </div>
  );
}

class OfficeView extends React.Component {
  constructor() {
    super();
    this.state = {
      officeIndex: 0,
    };
  }

  render() {
    if(!this.props.committee) {
      return (<div id="office-view-content"><p>No Data</p></div>);
    }
    var office = this.props.committee;
    return (
      <div id="office-view">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="row">
              <div className="dropdown col-xs-4">
                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                  Office Data
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" id="committee-info-select">
                  <li><a href="#">Office Data</a></li>
                  <li><a href="#">Votes</a></li>
                </ul>
              </div>
              <div className="col-xs-8" id="committee-info-selected">
                <h4>{office.title}, {office.chamber}</h4>
              </div>
            </div>
          </div>
          <div id="office-view-content" className="panel-content">
            <OfficeData office={office}/>
            <CommitteesData committees={this.props.committee.committees}/>
          </div>
        </div>
      </div>
    );
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
    			<div className="col-sm-6">
    				<OfficeView committee={this.state.committee}/>
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
