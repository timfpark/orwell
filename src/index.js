var projects = [];
    projects.push({projectName: 'Guide Dogs', allocation: 20});

var TimeCard = React.createClass({
  render: function() {
    return (
        <div>
          <form>
            <UserCard>
            </UserCard>
            <NewProject />
            <ProjectCard projectName={projects[0].projectName} allocation={projects[0].allocation} />
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
     return{allocation: this.props.allocation || 0,
            projectName: this.props.projectName || ''};
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
                                <input type="text" className="span2" value=""  data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value={this.state.allocation} data-slider-id="BC" id="time-slide" data-slider-handle="triangle" />
                            </span>
                        </div>
                  </div>
                  <div className="btn-group health-button-group" role="group" aria-label="...">
                    <button type="button" className="btn btn-default"><img width="30" height="30" src="assets/happy_emoji.png" /></button>
                    <button type="button" className="btn btn-default"><img width="30" height="30" src="assets/sad_emoji.png" /></button>
                    <button type="button" className="btn btn-default"><img width="30" height="30" src="assets/angry_emoji.jpg" /></button>
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
