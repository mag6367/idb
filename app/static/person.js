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







function DistrictData(props) {
  if(props.district) {
    return (
      <div id="district-data">
        <p>District: {props.district.Name} </p>
        <p>State: {props.district.State} </p>
      </div>
    );
  }
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

class OfficeDetails extends React.Component {
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
      return (<div class="panel-content"><p>No Data</p></div>);
    }
    var office = this.state.person.Offices[this.state.officeIndex];
    return (
      <div class="panel-content">
        <h4>Office: {office.Name}</h4>
        <p>Level: {office.Level} </p>
        <p>Branch: {office.Branch} </p>
        {office.Chamber ? (<p>Chamber: NA </p>) : (<div/>)}
        <DistrictData district={office.District}/>
        <p>Status: {office.Status}</p>
        <ElectionData office={office}/>
        <AppointmentData office={office}/>
      </div>
    );
  }
}

// function setOffice(officeIndex) {
//   var office = person["Offices"][officeIndex];
// }

ReactDOM.render(
  <OfficeDetails />,
  document.getElementById('person-info-display')
);
