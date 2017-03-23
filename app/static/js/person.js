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

var getPerson = function() {
  return window.location.pathname.substring(window.location.pathname.lastIndexOf('/'));
  // var searchParams = new URLSearchParams(window.location.search);
  // return searchParams.get("id");
}

function PersonPortrait(props) {
  if(props.person && props.person.image) {
    return (<img src={props.person.image} alt={props.person.name} style={{width: 300 + 'px'}}/>);
  }
  return (<img src="/api/v1/americanhero" alt="A sloth for all seasons" style={{width: 300 + 'px'}}/>);
}

function PersonLifespan(props) {
  if(false && props.person.IsDeceased) {
    return (<p id="person-lifespan">{props.person.DateBorn} - {props.person.DateDied}</p>);
  }
  return (<p id="person-lifespan">{props.person.date_of_birth} - Present</p>);
}

function PersonDetails(props) {
  return (
    <div id="person-details">
      <div className="caption text-center">
        <h2>{props.person.name}</h2>
        <p>Party affiliation: {props.person.current_party}</p>
        <PersonLifespan person={props.person}/>
        <a href={props.person.url}>Website</a>
      </div>
      <div className="caption text-center">
        <p>Twitter Handle: {props.person.twitter_account ? (<a href={"http://www.twitter.com/" + props.person.twitter_account}>{"@" + props.person.twitter_account}</a>) : ("None")}</p>
        <p>Facebook Account: {props.person.facebook_account ? (<a href={"http://www.facebook.com/" + props.person.facebook_account}>{props.person.facebook_account}</a>) : ("None")}</p>
        <p>Youtube Account: {props.person.youtube_account ? (<a href={"http://www.youtube.com/user/" + props.person.youtube_account}>{props.person.youtube_account}</a>) : ("None")}</p>
      </div>
    </div>
  );
}

class PersonView extends React.Component {
  constructor() {
    super();
  }

  render() {
    if(this.props.person) {
      return (
        <div className="thumbnail">
          <PersonPortrait person={this.props.person}/>
          <PersonDetails person={this.props.person}/>
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
    if(!this.props.person) {
      return (<div id="office-view-content"><p>No Data</p></div>);
    }
    var office = this.props.person;
    return (
      <div id="office-view">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="row">
              <div className="col-xs-5">
                {/*
                <div className="dropdown">
                  <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                    Office Data
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu" id="person-info-select">
                    <li><a href="#">Office Data</a></li>
                    <li><a href="#">Votes</a></li>
                  </ul>
                </div>
                */}
                <ul className="nav nav-tabs" role="tablist">
                  <li role="presentation" className="active"><a href="#office-view-tab-pane" aria-controls="office-view-tab-pane" role="tab" data-toggle="tab" >Office Data</a></li>
                  <li role="presentation"><a href="#votes-view-tab-pane" aria-controls="votes-view-tab-pane" role="tab" data-toggle="tab" >Votes</a></li>
                </ul>
              </div>
              <div className="col-xs-7" id="person-info-selected">
                <h4>{office.title}, {office.chamber}</h4>
              </div>
            </div>
          </div>
          <div id="office-view-content" className="panel-content">
            <div className="tab-content">
              <div role="tabpanel" className="tab-pane active" id="office-view-tab-pane">
                <OfficeData office={office}/>
                <CommitteesData committees={this.props.person.committees}/>
              </div>
              <div role="tabpanel" className="tab-pane" id="votes-view-tab-pane">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Bill</th>
                        <th>Vote</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><a href="/bills/hres5-115">H.RES.5</a></td>
                        <td><a href="/votes/House-1-3">House-1-3</a></td>
                      </tr>
                      <tr>
                        <td><a href="/bills/sconres3-115">S.CON.RES.3</a></td>
                        <td><a href="/votes/Senate-1-1">Senate-1-1</a></td>
                      </tr>
                      <tr>
                        <td><a href="/bills/sconres3-115">S.CON.RES.3</a></td>
                        <td><a href="/votes/Senate-1-2">Senate-1-2</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


class Member extends React.Component {
  constructor() {
    super();
    this.state = {
      member: null
    };
  }

  componentDidMount() {
    var that = this;
    loadJSONWrapper("/api/v1/members" + getPerson(), function(data) {
      that.updateData(data);
    });
  }

  updateData(data) {
    var that = this;
    if(data && data.success === true) {
      that.setState({
        member: data.data,
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
    				<PersonView person={this.state.member}/>
    			</div>
    			<div className="col-sm-6">
    				<OfficeView person={this.state.member}/>
    			</div>
    		</div>
    	</div>

    );
  }

}

ReactDOM.render(
  <Member />,
  document.getElementById('person')
);
