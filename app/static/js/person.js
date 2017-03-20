var loadJSONWrapper= function(path, callback) {
  $.ajax({
    url: path,
    success: callback,
    error: function(result){
        alert("Error reading person");
    }
  });
}

var getPerson = function() {
  var searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("id");
}

function PersonPortrait(props) {
  if(props.person && props.person.Image) {
    return (
      <img src={props.person.Image} alt={props.person.Name} style={{width: 300 + 'px'}}/>
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
        <h2 id="person-name">{props.person.first_name} {props.person.last_name}</h2>
        <p id="person-party">Party affiliation: {props.person.current_party}</p>
        <PersonLifespan person={props.person}/>
        <a id="person-website" href={props.person.url}>Website</a>
      </div>
      {/*
      <div className="caption text-center">
        <p>Birth Place: Palaven, Apien Crest, Milky Way</p>
        <p>Degrees: Astronaut Sloth needs none of your "degrees"</p>
        <p>Military: Official Advisor to Admiral Hackett</p>
      </div>
      */}
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

// function DistrictData(props) {
//   if(props.district) {
//     return (
//       <div id="district-data">
//         <p>District: {props.district.Name} </p>
//         <p>State: {props.district.State} </p>
//       </div>
//     );
//   }
//   return null;
// }
//
// function ElectionData(props) {
//   if(props.office.OfficeIsElected) {
//     return (
//       <div id="election-data">
//         <p>Date First Elected: {props.office.Election.Date}</p>
//         <p>Date Last Elected: {props.office.DateAssumed}</p>
//         <p>Date Next Election: {props.office.DateExpires}</p>
//       </div>
//     );
//   }
//   else {
//     return null;
//   }
// }
//
// function AppointmentData(props) {
//   if(props.office.OfficeIsAppointed) {
//     return (
//       <div id="appointment-data">
//         <p>Date Appointed: </p>
//         <p>Date Expires: </p>
//         <p>Appointed By: </p>
//         <p>Date Nominated: </p>
//         <p>Date Confirmed: </p>
//       </div>
//     );
//   }
//   else {
//     return null;
//   }
// }



function CommitteeData(props) {
  return (
    <div class="committee-data">
      <h4>{props.committee.name}</h4>
      <p>Rank in party: {props.committee.rank_in_party}</p>
      {/*
      {props.committe.begin_date ? (<p>Begin Data: {props.committee.begin_date</p>}) : (<div></div>)}
      {props.committe.end_date ? (<p>Begin Data: {props.committee.end_date</p>}) : (<div></div>)}
      */}
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
      {/*{office.Chamber ? (<p>Chamber: NA </p>) : (<div/>)}
      <p>Status: {office.Status}</p>
      <ElectionData office={office}/>
      <AppointmentData office={office}/>*/}
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
    var office = this.props.person.roles[this.state.officeIndex];
    return (
      <div id="office-view">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="row">
              <div className="dropdown col-xs-4">
                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                  Select Information
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" id="person-info-select">
                  <li><a href="#">Summary</a></li>
                  <li><a href="#">Secretary of Space</a></li>
                  <li><a href="#">Hero of the People (TM)</a></li>
                  <li><a href="#">Commander Shepards Drinking Buddy</a></li>
                </ul>
              </div>
              <div className="col-xs-8" id="person-info-selected">
                <h4>{office.title}, {office.chamber}</h4>
              </div>
            </div>
          </div>
          <div id="office-view-content" className="panel-content">
            <OfficeData office={office}/>
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
    loadJSONWrapper("api/v1/people/?id=" + getPerson(), function(data) {
      that.updatePerson(data);
    });
  }

  updatePerson(personData) {
    var that = this;
    if(personData) {
      that.setState({
        person: personData.results[0],
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
