"use strict";

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin("Projects");

var TimeCard = React.createClass({
  displayName: "TimeCard",

  mixins: [FluxMixin, StoreWatchMixin],

  getInitialState: function getInitialState() {
    this.getFlux().actions.PROJECT.init_load();
  },

  getStateFromFlux: function getStateFromFlux() {
    return this.getFlux().store("Projects").getState();
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromFlux());
  },

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "form",
        null,
        React.createElement(
          "div",
          { className: "app-container" },
          React.createElement(
            "div",
            { className: "container-fluid" },
            React.createElement(
              "div",
              { className: "row" },
              React.createElement(UserCard, { projects: this.state.projects }),
              this.state.projects.map(function (project, index) {
                return React.createElement(ProjectCard, { project: project, id: index });
              })
            )
          )
        )
      )
    );
  }
});

var UserCard = React.createClass({
  displayName: "UserCard",

  mixins: [FluxMixin],

  render: function render() {
    var formatter = function formatter(x) {
      return x + "%";
    };
    var defaultChartColors = ['#6bafbd', '#65cea7', '#f3ce85', '#fc8675'];

    return React.createElement(
      "div",
      { className: "col-md-3 col-xs-3 userHeader clearfix" },
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "page-title" },
          React.createElement(
            "ul",
            { className: "page-stats" },
            React.createElement(
              "li",
              null,
              React.createElement(
                "div",
                { className: "value" },
                React.createElement(
                  "span",
                  null,
                  "Active Projects"
                ),
                React.createElement(
                  "h4",
                  { id: "currentVisitor" },
                  this.props.projects.length
                )
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement(ResourceDonutChart, { formatter: formatter, colors: defaultChartColors })
            )
          )
        ),
        React.createElement("div", { className: "collapse navbar-collapse", id: "navbar-collapse2" })
      ),
      React.createElement(
        "div",
        null,
        React.createElement(NewProject, null)
      )
    );
  }
});

var ResourceDonutChart = React.createClass({
  displayName: "ResourceDonutChart",

  mixins: [FluxMixin],

  initializeChart: function initializeChart() {
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

  chartRendered: function chartRendered() {
    return this.getFlux().store("Projects").dataStore.chartObject;
  },

  componentWillReceiveProps: function componentWillReceiveProps() {
    if (!this.chartRendered()) this.initializeChart();
  },

  render: function render() {
    return React.createElement("div", { id: "projectChart", className: "chartStyle" });
  }
});

var ProjectCard = React.createClass({
  displayName: "ProjectCard",

  mixins: [FluxMixin],

  getInitialState: function getInitialState() {
    var noteCharCount = this.props.project.notes ? this.props.project.notes.length : 0;
    var noteCharAllowed = 160;
    var charRemaining = noteCharAllowed - noteCharCount;

    return { noteCharRemaining: charRemaining };
  },

  componentDidMount: function componentDidMount() {
    var self = this;
    var index = this.props.id;
    var sliderId = '#time-slide' + index;

    var slider = new Slider(sliderId, {
      formatter: function formatter(value) {
        return 'Current value: ' + value + '%';
      }
    });

    slider.on('slide', function (item) {
      var editedProjectItem = self.props;
      editedProjectItem.project.timeAllocation = item;

      self.getFlux().actions.PROJECT.edit_project_item(editedProjectItem);
    });
  },

  onNotesChange: function onNotesChange(ev) {
    var newTextCount = ev.target.value.length;
    var noteCharAllowed = 160;
    this.setState({ noteCharRemaining: noteCharAllowed - newTextCount });
  },

  onRemoveProject: function onRemoveProject(ev) {
    this.getFlux().actions.PROJECT.remove_project_item(this.props.project.projectName);
  },

  onChangeHealth: function onChangeHealth(ev) {
    var selectedHealth = ev.currentTarget.value;
    var currentProject = {};
    currentProject.project = this.props.project;
    currentProject.project.health = selectedHealth;

    this.getFlux().actions.PROJECT.edit_project_item(currentProject);
  },

  render: function render() {
    var sliderId = 'time-slide' + this.props.id;
    var currentProject = this.props.project;
    var self = this;

    var emojiButtonGroup = [{ icon: 'assets/happy_emoji.png', value: 1 }, { icon: 'assets/sad_emoji.png', value: 2 }, { icon: 'assets/angry_emoji.jpg', value: 3 }];

    return React.createElement(
      "div",
      { className: "col-md-3 col-xs-3 panel-container" },
      React.createElement(
        "div",
        { className: "panel panel-default projectcard-panel" },
        React.createElement(
          "div",
          { className: "panel-heading project-panel-heading" },
          React.createElement("img", { height: "30", width: "30", className: "project-icon", src: "assets/project_icon.png" }),
          React.createElement(
            "a",
            { href: "#", onClick: this.onRemoveProject },
            React.createElement("i", { className: "fa fa-times-circle pull-right", style: { 'color': 'red' } })
          ),
          React.createElement(
            "h4",
            { className: "project-title-label" },
            React.createElement(
              "span",
              null,
              currentProject.projectName
            ),
            React.createElement(
              "small",
              { className: "project-panel-heading-description" },
              currentProject.timeAllocation,
              "%"
            )
          )
        ),
        React.createElement(
          "div",
          { className: "panel-body project-panel-body" },
          React.createElement(
            "div",
            { className: "project-panel-project-attribute" },
            React.createElement(
              "span",
              null,
              "Time Allocation:"
            ),
            React.createElement(
              "span",
              { className: "project-panel-slider-container" },
              React.createElement("input", { type: "text", className: "span2", value: "", "data-slider-min": "0", "data-slider-max": "100", "data-slider-step": "5", "data-slider-value": currentProject.timeAllocation, "data-slider-id": "BC", id: sliderId, "data-slider-handle": "triangle" })
            )
          )
        ),
        React.createElement(
          "div",
          { className: "btn-group health-button-group", "data-toggle": "buttons" },
          emojiButtonGroup.map(function (emoji, index) {
            var defaultStyle = "btn btn-default";
            var selectButton = emoji.value === currentProject.health ? " active" : "";
            var style = defaultStyle + selectButton;
            var elementId = "health" + index;

            return React.createElement(
              "label",
              { className: style },
              React.createElement(
                "input",
                { type: "radio", id: elementId, onClick: self.onChangeHealth, name: "health", value: emoji.value },
                React.createElement(
                  "span",
                  null,
                  React.createElement("img", { width: "30", height: "30", src: emoji.icon })
                )
              )
            );
          })
        ),
        React.createElement(
          "div",
          { className: "panel-body project-panel-body" },
          React.createElement(
            "div",
            { className: "project-panel-project-attribute" },
            React.createElement(
              "span",
              null,
              "Notes: ",
              React.createElement(
                "small",
                null,
                this.state.noteCharRemaining,
                " remaining"
              )
            )
          ),
          React.createElement(
            "div",
            null,
            React.createElement("textarea", { defaultValue: currentProject.notes, className: "form-control", rows: "2", id: "comment", onChange: this.onNotesChange })
          )
        )
      )
    );
  }
});

var NewProject = React.createClass({
  displayName: "NewProject",

  mixins: [FluxMixin],

  newProject: function newProject(event) {
    this.getFlux().actions.PROJECT.add_project_item({
      projectName: 'New Project', allocation: 5, notes: 'Add Some Notes'
    });
  },

  onProjectsSave: function onProjectsSave(ev) {
    var dataStore = this.getFlux().store("Projects").dataStore;

    this.getFlux().actions.PROJECT.save_project({
      projects: dataStore.projects, RowKey: dataStore.RowKey, PartitionKey: dataStore.PartitionKey
    });
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "div",
        { className: "col-md-12" },
        React.createElement(
          "div",
          { className: "actionbar-wrapper" },
          React.createElement(
            "button",
            { type: "button", className: "btn btn-success btn-sm", onClick: this.newProject },
            React.createElement("span", { className: "fa fa-plus-circle fa-lg", "aria-hidden": "true" }),
            " Add Project"
          ),
          "  ",
          React.createElement(
            "button",
            { type: "button", className: "btn btn-primary btn-sm", onClick: this.onProjectsSave },
            React.createElement("span", { className: "fa fa-cloud-upload", "aria-hidden": "true" }),
            " Save"
          )
        )
      )
    );
  }
});

var stores = {
  Projects: new ProjectDataStore()
};

var flux = new Fluxxor.Flux(stores, Actions.methods);

flux.on("dispatch", function (type, payload) {
  console.log("Dispatch:", type, payload);
});

React.render(React.createElement(TimeCard, { flux: flux }), document.getElementById('app'));