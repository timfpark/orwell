var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin("Projects");

var TimeCard = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin],

  getInitialState: function() {
    this.getFlux().actions.PROJECT.init_load();
  },

  getStateFromFlux: function() {
    return this.getFlux().store("Projects").getState();
  },

  componentWillReceiveProps: function(nextProps) {
       this.setState(this.getStateFromFlux());
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
                        return <ProjectCard project={project} id={index}/>
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
  mixins: [FluxMixin],

  render: function() {
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
                            <h4 id="currentVisitor">{this.props.projects.length}</h4>
                          </div>
                        </li>
                        <li>
                           <ResourceDonutChart formatter={formatter} colors={defaultChartColors}/>
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
  mixins: [FluxMixin],

  initializeChart: function(){
    var dataStore = this.getFlux().store("Projects").dataStore;
    var self = this;

    var chart = Morris.Donut({
       element: React.findDOMNode(self),
       data: dataStore.chartData,
       resize: true,
       formatter: this.props.formatter,
       colors: this.props.colors
     });

     dataStore.chartObject = chart;
  },

  chartRendered: function(){
    return this.getFlux().store("Projects").dataStore.chartObject;
  },

  componentWillReceiveProps: function(){
    if(!this.chartRendered())
       this.initializeChart();
  },

  render: function() {
    return (
       <div id="projectChart" className="chartStyle" />
    );
  }
});

var ProjectCard = React.createClass({
  mixins: [FluxMixin],

  getInitialState: function() {
    var noteCharCount = this.props.project.notes?this.props.project.notes.length: 0;
    var noteCharAllowed = 160;
    var charRemaining = noteCharAllowed - noteCharCount;

    return{noteCharRemaining: charRemaining};
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
        var editedProjectItem = self.props;
            editedProjectItem.project.timeAllocation = item;

        self.getFlux().actions.PROJECT.edit_project_item(editedProjectItem);
      });
  },

  onNotesChange: function(ev){
     var newTextCount = ev.target.value.length;
     var noteCharAllowed = 160;
     this.setState({noteCharRemaining: noteCharAllowed - newTextCount});
  },

  onRemoveProject: function(ev){
    this.getFlux().actions.PROJECT.remove_project_item(this.props.project.projectName);
  },

  onChangeHealth: function(ev){
    var selectedHealth = ev.currentTarget.value;
    var currentProject = {};
        currentProject.project = this.props.project;
        currentProject.project.health = selectedHealth;

    this.getFlux().actions.PROJECT.edit_project_item(currentProject);
  },

  render: function() {
    var sliderId = 'time-slide' + this.props.id;
    var currentProject = this.props.project;
    var self = this;

    var emojiButtonGroup = [
      {icon: 'assets/happy_emoji.png', value: 1},
      {icon: 'assets/sad_emoji.png', value: 2},
      {icon: 'assets/angry_emoji.jpg', value: 3}
    ];

    return (
          <div className="col-md-3 col-xs-3 panel-container">
              <div className="panel panel-default projectcard-panel">
                  <div className="panel-heading project-panel-heading">
                        <img height="30" width="30" className="project-icon" src="assets/project_icon.png" />
                        <a href="#" onClick={this.onRemoveProject}><i className="fa fa-times-circle pull-right" style={{'color':'red'}}></i></a>
                        <h4 className="project-title-label">
                           <span>{currentProject.projectName}</span>
                           <small className="project-panel-heading-description">{currentProject.timeAllocation}%</small>
                        </h4>
                  </div>
                  <div className="panel-body project-panel-body">
                        <div className="project-panel-project-attribute" >
                            <span>Time Allocation:</span>
                            <span className="project-panel-slider-container">
                                <input type="text" className="span2" value=""  data-slider-min="0" data-slider-max="100" data-slider-step="5" data-slider-value={currentProject.timeAllocation} data-slider-id="BC" id={sliderId} data-slider-handle="triangle" />
                            </span>
                        </div>
                  </div>
                  <div className="btn-group health-button-group" data-toggle="buttons">
                  {
                    emojiButtonGroup.map(function(emoji, index){
                       var defaultStyle = "btn btn-default"
                       var selectButton = (emoji.value === currentProject.health)?" active":"";
                       var style = defaultStyle + selectButton;
                       var elementId = "health" + index;

                       return <label className={style}>
                                 <input type="radio" id={elementId} onClick={self.onChangeHealth} name="health" value={emoji.value}><span><img width="30" height="30" src={emoji.icon} /></span></input>
                              </label>
                    })
                  }
                  </div>
                  <div className="panel-body project-panel-body">
                        <div className="project-panel-project-attribute" >
                            <span>Notes: <small>{this.state.noteCharRemaining} remaining</small></span>
                        </div>
                        <div>
                             <textarea className="form-control" rows="2" id="comment" onChange={this.onNotesChange}>
                                {currentProject.notes}
                             </textarea>
                        </div>
                  </div>
              </div>
          </div>
    );
  }
});

var NewProject = React.createClass({
  mixins: [FluxMixin],

  newProject: function(event) {
    this.getFlux().actions.PROJECT.add_project_item({
      projectName: 'New Project', allocation: 5, notes: 'Add Some Notes'
    });
  },

  onProjectsSave :function(ev){
    var dataStore = this.getFlux().store("Projects").dataStore;

    this.getFlux().actions.PROJECT.save_project({
      projects: dataStore.projects, RowKey: dataStore.RowKey, PartitionKey: dataStore.PartitionKey
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
                <button type="button" className="btn btn-primary btn-sm" onClick={this.onProjectsSave}>
                   <span className="fa fa-cloud-upload" aria-hidden="true"></span>&nbsp;Save
                </button>
            </div>
        </div>
      </div>
    );
  }
});

var stores = {
  Projects: new ProjectDataStore()
};

var flux = new Fluxxor.Flux(stores, Actions.methods);

flux.on("dispatch", function(type, payload) {
      console.log("Dispatch:", type, payload);
});

React.render(
  <TimeCard flux={flux} />,
  document.getElementById('app')
);
