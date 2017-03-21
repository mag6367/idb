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
    return (
      <img src={props.person.image} alt={props.person.name} style={{width: 300 + 'px'}}/>
    );
  }
  return (
    <img src="/api/v1/americanhero" alt="A sloth for all seasons" style={{width: 300 + 'px'}}/>
  );
}

function PersonLifespan(props) {
  if(false && props.person.IsDeceased) {
    return (
      <p id="person-lifespan">
        {props.person.DateBorn} - {props.person.DateDied}
      </p>
    );
  }
  return (
    <p id="person-lifespan">
      {props.person.date_of_birth} - Present
    </p>
  );
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
    <a href={"/committees/" + props.committee.code}>{props.committee.name}</a>
  );
}

// function CommitteesData(props) {
//   const committees = props.committees.map((committee) =>
//     <li key={committee.code}>
//       <CommitteeData committee={committee} />
//     </li>
//   );
//
//   return (
//     <div className="committee-list">
//       <ul>
//         {committees}
//       </ul>
//     </div>
//   );
// }

function CommitteesData(props) {
  const committees = props.committees.map((committee) =>
    <tr key={committee.code}>
      <td><CommitteeData committee={committee} /></td>
    </tr>
  );

  return (
    <table className="committee-list table table-striped">
      <thead>
        <tr><th>Committees:</th></tr>
      </thead>
      <tbody>
        {committees}
      </tbody>
    </table>
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
              <div className="dropdown col-xs-4">
                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                  Office Data
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" id="person-info-select">
                  <li><a href="#">Office Data</a></li>
                  <li><a href="#">Votes</a></li>
                </ul>
              </div>
              <div className="col-xs-8" id="person-info-selected">
                <h4>{office.title}, {office.chamber}</h4>
              </div>
            </div>
          </div>
          <div id="office-view-content" className="panel-content">
            <OfficeData office={office}/>
            <CommitteesData committees={this.props.person.committees}/>
          </div>
        </div>
      </div>
    );
  }
}


class Person extends React.Component {
  constructor() {
    super();
    this.state = {
      person: null
    };
  }

  componentDidMount() {
    var that = this;
    loadJSONWrapper("/api/v1/people" + getPerson(), function(data) {
      that.updatePerson(data);
    });
  }

  updatePerson(personData) {
    var that = this;
    if(personData && personData.success === true) {
      that.setState({
        person: personData.data,
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
    				<PersonView person={this.state.person}/>
    			</div>
    			<div className="col-sm-6">
    				<OfficeView person={this.state.person}/>
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
  <Person />,
  document.getElementById('person')
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
