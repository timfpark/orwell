Office.initialize = function (reason) {};

var TimeCard = React.createClass({
  getInitialState: function() {
    TimeCard.instance = this;
    return {
      projects: [
        { projectName: 'Guide Dogs', allocation: 60, notes: 'This project is going great!' },
        { projectName: 'Project Bethesda', allocation: 22, notes: 'Killing it!' },
        { projectName: 'Docker Hackfest', allocation: 18, notes: '' }
      ]
    };
  },
  render: function() {
    return (
        <div>
          <form>
            <div className="app-container">
              <div className="container-fluid">
                <div className="row">
                  <UserCard projects={this.state.projects} />
                  {
                    this.state.projects.map(function(project, index){
                        return <ProjectCard projectName={project.projectName} allocation={project.allocation}
                                            notes={project.notes} id={index}/>
                    })
                  }
              </div>
            </div>
          </div>
          </form>
        </div>
    );
  }
});

var UserCard = React.createClass({
  getInitialState: function() {
    var defaultUsername = "Erik Schlegel";
    var userName = (typeof Office != 'undefined' && typeof Office.context != 'undefined')?Office.context.mailbox.userProfile.displayName:defaultUsername;

    return{userDisplayName: userName, projects: this.props.projects || []};
  },

  render: function() {
    var chartInitialData = [];

    if(this.state.projects){
      this.state.projects.map(function(project){
          chartInitialData.push({label: project.projectName, value: project.allocation});
      });
    }

    var formatter = function (x) { return x + "%"};
    var defaultChartColors = [
        '#6bafbd',
        '#65cea7',
        '#f3ce85',
        '#fc8675'
      ];

    return (
               <div className="col-md-3 col-xs-3 userHeader clearfix">
                 <div>
                   <div className="page-title">
                     <ul className="page-stats">
                        <li>
                          <div className="value">
                            <span>Active Projects</span>
                            <h4 id="currentVisitor">{this.state.projects.length}</h4>
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
                <div>
                    <NewProject />
                </div>
              </div>
    );
  }
});

var ResourceDonutChart = React.createClass({
  getInitialState: function() {
    ResourceDonutChart.instance = this;

    var chartData =this.props.data || [];

     return{chartData: chartData,
            formatter: this.props.formatter || false,
            colors: this.props.colors || false,
            chart: false};
  },

  componentDidMount: function () {
    var self = this;

    if(this.state.chartData){
        var chart = Morris.Donut({
           element: React.findDOMNode(self),
           data: this.state.chartData,
           resize: true,
           formatter: this.state.formatter,
           colors: this.state.colors
         });

        this.setState({chart: chart});
     }
  },

  refreshDonutChart(){
    if(this.state.chart)
       this.state.chart.setData(this.state.chartData);
  },

  render: function() {
    this.refreshDonutChart();

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
      var index = this.props.id;
      var sliderId = '#time-slide' + index;

      var slider = new Slider(sliderId, {
      	formatter: function(value) {
      		return 'Current value: ' + value + '%';
      	}
      });

      slider.on('slide', function(item){
        self.setState({allocation: item});
        var chartData = ResourceDonutChart.instance.state.chartData;
        var newChart = chartData.map(function(chartItem){
            if(chartItem.label == self.state.projectName)
               chartItem.value = item;

            return chartItem;
        });

        ResourceDonutChart.instance.setState({chartData:newChart});
      });
  },

  onNotesChange: function(ev){
     var newTextCount = ev.target.value.length;
     var noteCharAllowed = 160;
     this.setState({noteCharRemaining: noteCharAllowed - newTextCount});
  },

  render: function() {
    var sliderId = 'time-slide' + this.props.id;

    return (
          <div className="col-md-3 col-xs-3 panel-container">
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
                                <input type="text" className="span2" value=""  data-slider-min="0" data-slider-max="100" data-slider-step="5" data-slider-value={this.state.allocation} data-slider-id="BC" id={sliderId} data-slider-handle="triangle" />
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
                            <span>Notes: <small>{this.state.noteCharRemaining} remaining</small></span>
                        </div>
                        <div>
                             <textarea className="form-control" rows="2" id="comment" onChange={this.onNotesChange}>
                                {this.state.notes}
                             </textarea>
                        </div>
                  </div>
              </div>
          </div>
    );
  }
});

var NewProject = React.createClass({
  newProject: function(event) {
    var projects = TimeCard.instance.state.projects;
    projects.push({
      projectName: 'New Project', allocation: 20, notes: 'Initial Commit'
    });

    TimeCard.instance.setState({
      projects: projects
    });
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
            <div className="actionbar-wrapper">
                <button type="button" className="btn btn-success btn-sm" onClick={this.newProject}>
                   <span className="fa fa-plus-circle fa-lg" aria-hidden="true"></span>&nbsp;Add Project
                </button>
                &nbsp;&nbsp;
                <button type="button" className="btn btn-primary btn-sm">
                   <span className="fa fa-cloud-upload" aria-hidden="true"></span>&nbsp;Save
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
