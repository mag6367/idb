


var loadJSONWrapper= function(path, callback) {
  $.ajax({
    url: path,
    dataType: "json",
    success: callback,
    error: function(xhr, textStatus, errorThrown){
        alert("Skit jaevla fan! Error reading vote: " + textStatus);
    }
  });
}

var getVote = function() {
  return window.location.pathname.substring(window.location.pathname.lastIndexOf('/'));
  // var searchParams = new URLSearchParams(window.location.search);
  // return searchParams.get("id");
}

class SummaryView extends React.Component {
  constructor() {
    super();
  }

  render() {
    if(this.props.vote) {
      var vote=this.props.vote;
      return (
        <div className="panel panel-default" id="vote-summary-view-panel">
          <div className="panel-heading" id="vote-summary-view-top-heading">
            <div className="caption text-center">
              <h4>Vote: {vote.description}</h4>
            </div>
          </div>
          <div className="panel-heading" id="vote-summary-view-bill">
            <h4>Bill: <a href={"/bills/" + vote.bill.bill_id}>{vote.bill.number}</a></h4>
            <p><i>{vote.bill.title}</i></p>
            <p>Latest Action: {this.props.vote.bill.latest_action}</p>
          </div>
          <div className="panel-content">
            <div className="caption text-center">

              <p>Chamber: {vote.chamber}</p>
              <p>Session {vote.session}, roll call {vote.roll_call}</p>
              <p>Question: {vote.question}</p>
              <p>Vote Type: {vote.vote_type}</p>
              <p>Date: {vote.date}</p>
              <p>Time: {vote.time}</p>
              {/*
              <p>Twitter Handle: {props.person.twitter_account ? (<a href={"http://www.twitter.com/" + props.person.twitter_account}>{"@" + props.person.twitter_account}</a>) : ("None")}</p>
              <p>Facebook Account: {props.person.facebook_account ? (<a href={"http://www.facebook.com/" + props.person.facebook_account}>{props.person.facebook_account}</a>) : ("None")}</p>
              <p>Youtube Account: {props.person.youtube_account ? (<a href={"http://www.youtube.com/user/" + props.person.youtube_account}>{props.person.youtube_account}</a>) : ("None")}</p>
              */}
            </div>
          </div>
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

function VoterData(props) {
  const voters = props.vote.positions.map((voter) =>
    <tr key={voter.member_id} >
      <td><a href={"/members/" + voter.member_id}>{voter.member_id}</a></td>
      <td>{voter.vote_position}</td>
    </tr>
  );

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Member</th>
            <th>Vote</th>
          </tr>
        </thead>
        <tbody>
          {voters}
        </tbody>
      </table>
    </div>
  );
}


function VoteList(props) {
  return (
    <div className="panel-content" id="votes-view-voting-list" >
      <VoterData vote={props.votes.vote}/>
    </div>
  );
}

function partyVotes(party) {
  return [
    <tr><td>Yes: {party.yes}</td></tr>,
    <tr><td>No: {party.no}</td></tr>,
    <tr><td>Present: {party.present}</td></tr>,
    <tr><td>Not Voting: {party.not_voting}</td></tr>
  ];
}

function VoteResults(props) {
  var vote = props.votes.vote;
  return (
    <div className="panel-content" id="vote-results" >
      <div className="row">
        <div className="col-sm-6" id="vote-results-col-left">
          <table className="table">
            <thead></thead>
            <tbody>
              <tr><td style={{"background-color": "#777", "color": "#FFF"}}>Total</td></tr>
              {partyVotes(vote.total)}
              <tr><td style={{"background-color": "#3C3B6E", "color": "#FFF"}}>Democratic</td></tr>
              {partyVotes(vote.democratic)}
            </tbody>
          </table>
        </div>
        <div className="col-sm-6" id="vote-results-col-right">
          <table className="table">
            <thead></thead>
            <tbody>
              <tr><td style={{"background-color": "#157708", "color": "#FFF"}}>Independent</td></tr>
              {partyVotes(vote.independent)}
              <tr><td style={{"background-color": "#B22234", "color": "#FFF"}}>Republican</td></tr>
              {partyVotes(vote.republican)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


class VotesView extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0
    };
  }

  render() {
    if(!this.props.votes) {
      return (<p>No Data</p>);
    }
    var votes = this.props.votes;
    var content;
    if(this.state.index === 0) {
      content = <VoteResults votes={this.props.votes}/>
    }
    else {
      content = <VoteList votes={this.props.votes}/>
    }
    return (
      <div id="votes-view">
        <div className="panel panel-default">
          <div className="panel-heading">
            <ul className="nav nav-tabs" role="tablist">
              <li role="presentation" className="active"><a href="#votes-view-results-tab-pane" aria-controls="votes-view-results-tab-pane" role="tab" data-toggle="tab" >Voting Summary</a></li>
              <li role="presentation">                   <a href="#votes-view-list-tab-pane" aria-controls="votes-view-list-tab-pane" role="tab" data-toggle="tab" >Voting List</a></li>
            </ul>
          </div>
          <div className="tab-content">
            <div role="tabpanel" className="tab-pane active" id="votes-view-results-tab-pane">
              <VoteResults votes={this.props.votes}/>
            </div>
            <div role="tabpanel" className="tab-pane" id="votes-view-list-tab-pane">
              <VoteList votes={this.props.votes}/>
            </div>
          </div>
          {/*{content}*/}
        </div>
      </div>
    );
  }
}


class Votes extends React.Component {
  constructor() {
    super();
    this.state = {
      votes: null
    };
  }

  componentDidMount() {
    var that = this;
    loadJSONWrapper("/api/v1/votes" + getVote(), function(data) {
      that.updateVotes(data);
    });
  }

  updateVotes(data) {
    var that = this;
    if(data && data.success === true) {
      that.setState({
        votes: data.data,
      });
    }
    else {
      alert("ELSE2");
    }
  }

  render() {
    var summaryView;
    var votesView;
    if(this.state.votes) {
      summaryView = <SummaryView vote={this.state.votes.vote}/>;
      votesView = <VotesView votes={this.state.votes}/>
    }
    else {
      summaryView = <p>No Data</p>
      votesView = <p>No Data</p>
    }



    return (
      <div className="container">
    		<div className="row">
    			<div className="col-sm-6">
    				{summaryView}
    			</div>
    			<div className="col-sm-6">
    				{votesView}
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

ReactDOM.render(
  <Votes />,
  document.getElementById('vote')
);
