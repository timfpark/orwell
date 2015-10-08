var projects = [];
    projects.push({projectName: 'Guide Dogs', allocation: 20, notes: 'This project is going great!'});

var TimeCard = React.createClass({
  render: function() {
    return (
        <div>
          <form>
            <UserCard>
            </UserCard>
            <NewProject />
            <ProjectCard projectName={projects[0].projectName} allocation={projects[0].allocation}
                         notes={projects[0].notes}/>
          </form>
        </div>
    );
  }
});

var UserCard = React.createClass({
  render: function() {
    var chartInitialData = [
        {label: "Project Bethesda", value: 22},
        {label: "Guide-Dogs", value: 60},
        {label: "Docker Hackfest", value: 18}
      ];
    var formatter = function (x) { return x + "%"};
    var defaultChartColors = [
        '#6bafbd',
        '#65cea7',
        '#f3ce85',
        '#fc8675'
      ];

    return (
      <div className="app-container">
        <div className="container-fluid">
          <div className="row">
               <div className="col-md-12 userHeader clearfix">
                 <div>
                   <div className="page-title">
                     <div className="page-title">
                        <h3 className="no-margin"><img src="assets/icon_grey_office365.png" width="30" height="30" />Erik Schlegel</h3>
            					  <span className="dateLabel">Week of October 5th</span>
            				 </div>
                     <ul className="page-stats">
                        <li>
                          <div className="value">
                            <span>Active Projects</span>
                            <h4 id="currentVisitor">3</h4>
                          </div>
                        </li>
                        <li>
                           <ResourceDonutChart data={chartInitialData} formatter={formatter}
                                               colors={defaultChartColors}/>
                        </li>
                    </ul>
                   </div>
                   <div className="collapse navbar-collapse" id="navbar-collapse2">
                   </div>
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

     return{chartData: chartData,
            formatter: this.props.formatter || false,
            colors: this.props.colors || false};
  },

  componentDidMount: function () {
    var self = this;

    if(this.state.chartData){
        Morris.Donut({
           element: React.findDOMNode(self),
           data: this.state.chartData,
           resize: true,
           formatter: this.state.formatter,
           colors: this.state.colors
         })
     }
  },

  render: function() {
    return (
       <div id="projectChart" className="chartStyle" />
    );
  }
});

var ProjectCard = React.createClass({
  getInitialState: function() {
    var noteCharCount = this.props.notes?this.props.notes.length: 0;
    var noteCharAllowed = 160;
    var charRemaining = noteCharAllowed - noteCharCount;

     return{allocation: this.props.allocation || 0,
            projectName: this.props.projectName || '',
            notes: this.props.notes || '',
            noteCharRemaining: charRemaining};
  },

  componentDidMount: function () {
      var self = this;

      var slider = new Slider('#time-slide', {
      	formatter: function(value) {
      		return 'Current value: ' + value + '%';
      	}
      });

      slider.on('slide', function(item){
        self.setState({allocation: item});
      });
  },

  onNotesChange: function(ev){
     var newTextCount = ev.target.value.length
     this.setState({noteCharRemaining: 160 - newTextCount});
  },

  render: function() {
    return (
      <div className="row">
          <div className="col-md-8 col-xs-8">
              <div className="panel panel-default projectcard-panel">
                  <div className="panel-heading project-panel-heading">
                        <img height="30" width="30" className="project-icon" src="assets/project_icon.png" />
                        <a href="#"><i className="fa fa-times-circle pull-right" style={{'color':'red'}}></i></a>
                        <h4 className="project-title-label">
                           <span>{this.state.projectName}</span>
                           <small className="project-panel-heading-description">{this.state.allocation}%</small>
                        </h4>
                  </div>
                  <div className="panel-body project-panel-body">
                        <div className="project-panel-project-attribute" >
                            <span>Time Allocation:</span>
                            <span className="project-panel-slider-container">
                                <input type="text" className="span2" value=""  data-slider-min="0" data-slider-max="100" data-slider-step="5" data-slider-value={this.state.allocation} data-slider-id="BC" id="time-slide" data-slider-handle="triangle" />
                            </span>
                        </div>
                  </div>
                  <div className="btn-group health-button-group" data-toggle="buttons">
                      <label className="btn btn-default">
                          <input type="radio" id="q156" name="health" value="1" selected><span><img width="30" height="30" src="assets/happy_emoji.png" /></span></input>
                      </label>
                      <label className="btn btn-default active">
                          <input type="radio" id="q157" name="health" value="2" checked=""><span><img width="30" height="30" src="assets/sad_emoji.png" /></span></input>
                      </label>
                      <label className="btn btn-default">
                          <input type="radio" id="q158" name="health" value="3"><span><img width="30" height="30" src="assets/angry_emoji.jpg" /></span></input>
                      </label>
                  </div>
                  <div className="panel-body project-panel-body">
                        <div className="project-panel-project-attribute" >
                            <span>Notes:(<i>{this.state.noteCharRemaining} characters remaining</i>)</span>
                        </div>
                        <div>
                             <textarea className="form-control" rows="3" id="comment" onChange={this.onNotesChange}>
                                {this.state.notes}
                             </textarea>
                        </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
});

var NewProject = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
            <div className="actionbar-wrapper">
                <button type="button" className="btn btn-success btn-sm">
                   <span class="glyphicon glyphicon-star" aria-hidden="true"></span>Add Project
                </button>
            </div>
        </div>
      </div>
    );
  }
});

React.render(
  <TimeCard />,
  document.getElementById('app')
);
