var loadJSONWrapper= function(path, callback) {
  $.ajax({
    url: path,
    success: function(content) {
      if(content) {
        callback(content);
        // personData.content = content;
        // alert("Setting to " + personData.content.Name);
      }
      else {
        alert("Error reading person");
      }
    },
    error: function(result){
        alert("Error reading person");
    }
  });
}

function PersonPortrait(props) {
  if(props.person && props.person.Image) {
    return (
      <img src={props.person.Image} alt={props.person.Name} style={{width: 300 + 'px'}}/>
    );
  }
  return null;
}

function PersonLifespan(props) {
  if(props.person.IsDeceased) {
    return (
      <p id="person-lifespan">
        {props.person.DateBorn} - {props.person.DateDied}
      </p>
    );
  }
  return (
    <p id="person-lifespan">
      {props.person.DateBorn} - Present
    </p>
  );
}

function PersonDetails(props) {
  return (
    <div id="person-details">
      <div className="caption text-center">
        <h2 id="person-name">{props.person.Name}</h2>
        <p id="person-party">Party affiliation: {props.person.PartyAffiliation}</p>
        <PersonLifespan person={props.person}/>
        <a id="person-website" href="#">Website</a>
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
    this.state = {
      person: null
    };
  }

  componentDidMount() {
    var that = this;
    loadJSONWrapper("example_person_01.json", function(data) {
      that.updatePerson(data);
    });
  }

  updatePerson(personData) {
    var that = this;
    if(personData) {
      that.setState({
        person: personData,
      });
    }
    else {
      alert("ELSE2");
    }
  }

  render() {
    if(this.state.person) {
      return (
        <div className="thumbnail">
          <PersonPortrait person={this.state.person}/>
          <PersonDetails person={this.state.person}/>
        </div>
      );
    }
    return (<p>No Data</p>);
  }
}

function DistrictData(props) {
  if(props.district) {
    return (
      <div id="district-data">
        <p>District: {props.district.Name} </p>
        <p>State: {props.district.State} </p>
      </div>
    );
  }
  return null;
}

function ElectionData(props) {
  if(props.office.OfficeIsElected) {
    return (
      <div id="election-data">
        <p>Date First Elected: {props.office.Election.Date}</p>
        <p>Date Last Elected: {props.office.DateAssumed}</p>
        <p>Date Next Election: {props.office.DateExpires}</p>
      </div>
    );
  }
  else {
    return null;
  }
}

function AppointmentData(props) {
  if(props.office.OfficeIsAppointed) {
    return (
      <div id="appointment-data">
        <p>Date Appointed: </p>
        <p>Date Expires: </p>
        <p>Appointed By: </p>
        <p>Date Nominated: </p>
        <p>Date Confirmed: </p>
      </div>
    );
  }
  else {
    return null;
  }
}

class OfficeView extends React.Component {
  constructor() {
    super();
    this.state = {
      officeIndex: 0,
      person: null
    };
  }

  componentDidMount() {
    var that = this;
    loadJSONWrapper("example_person_01.json", function(data) {
      that.updatePerson(data);
    });
  }

  updatePerson(personData) {
    var that = this;
    if(personData) {
      that.setState({
        person: personData,
      });
    }
    else {
      alert("ELSE2");
    }
  }

  render() {
    if(!this.state.person) {
      return (<div id="office-view-content"><p>No Data</p></div>);
    }
    var office = this.state.person.Offices[this.state.officeIndex];
    return (
      <div id="office-view-content">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="row">
              <div className="dropdown col-xs-6">
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
              <div className="col-xs-6" id="person-info-selected">
                <h4>{office.Name}</h4>
              </div>
            </div>
          </div>
          <div className="panel-content">
            <h4>Office: {office.Name}</h4>
            <p>Level: {office.Level} </p>
            <p>Branch: {office.Branch} </p>
            {office.Chamber ? (<p>Chamber: NA </p>) : (<div/>)}
            <DistrictData district={office.District}/>
            <p>Status: {office.Status}</p>
            <ElectionData office={office}/>
            <AppointmentData office={office}/>
          </div>
        </div>
      </div>
    );
  }
}

// function setOffice(officeIndex) {
//   var office = person["Offices"][officeIndex];
// }

ReactDOM.render(
  <PersonView />,
  document.getElementById('person-info-view')
);

ReactDOM.render(
  <OfficeView />,
  document.getElementById('person-office-view')
);
