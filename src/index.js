var TimeCard = React.createClass({
  render: function() {
    return (
        <div>
            <UserCard>
            </UserCard>
            <NewProject />
            <button>Submit</button>
        </div>
    );
  }
});


var UserCard = React.createClass({
  render: function() {
    var chartInitialData = [
        {label: "Download Sales", value: 12},
        {label: "In-Store Sales", value: 30},
        {label: "Mail-Order Sales", value: 20}
      ];

    return (
      <div className="app-container">
        <div className="container-fluid">
          <div className="navbar navbar-default userHeader" id="subnav">
               <div className="col-md-12 profileHeader">
                   <div className="navbar-header profile-navbar">
                     <img src="assets/icon_grey_office365.png" width="30" height="30" />
                     <span>Erik Schlegel</span>
                     <div className="dateLabel">
                        Week of October 5th
                     </div>
                     <div className="pull-right">
                        <ResourceDonutChart data={chartInitialData}/>
                     </div>
                   </div>
                   <div className="collapse navbar-collapse" id="navbar-collapse2">
                  </div>
               </div>
          </div>
        </div>
      </div>
    );
  }
});

var ResourceDonutChart = React.createClass({
  getInitialState: function() {
    var chartData =this.props.data || [];

     return{chartData: chartData};
  },

  componentDidMount: function () {
    var self = this;

    if(this.state.chartData){
        Morris.Donut({
           element: React.findDOMNode(self),
           data: this.state.chartData,
           resize: true
         })
     }
  },

  render: function() {
    return (
       <div id="projectChart" className="chartStyle">>
       </div>
    );
  }
});

var ProjectCard = React.createClass({
  render: function() {
    return (
    <div className="container-fluid">
      <form>
        <div className="row">
          <div className="col-md-12">
              <h3>Project 1: Stroeer</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
              <b>Time Allocation:</b>
              60%
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
              <b>Project Health:</b>

              <div className="btn-group" data-toggle="buttons">
                <label className="btn btn-primary active">
                    <input type="radio" name="health" value="happy" autocomplete="off" checked /> Happy
                </label>
                <label className="btn btn-primary">
                    <input type="radio" name="health" value="neutral" autocomplete="off"/> Neutral
                </label>
                <label className="btn btn-primary">
                    <input type="radio" name="health" value="sad" autocomplete="off"/> Sad
                </label>
                <label className="btn btn-primary">
                    <input type="radio" name="health" value="angry" autocomplete="off"/> Angry
                </label>
                <label className="btn btn-primary">
                    <input type="radio" name="health" value="stressed" autocomplete="off"/> Stressed
                </label>
              </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <textarea rows="4" cols="50">
            * Did a thing
            * Did another thing
            * Yet another thing
            </textarea>
          </div>
        </div>
      </form>
    </div>
    );
  }
});

var NewProject = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
            + Add a New Project
        </div>
      </div>
    );
  }
});

React.render(
  <TimeCard />,
  document.getElementById('app')
);
