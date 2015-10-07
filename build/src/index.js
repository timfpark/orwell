"use strict";

var projects = [];
projects.push({ projectName: 'Guide Dogs', allocation: 20 });

var TimeCard = React.createClass({
  displayName: "TimeCard",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "form",
        null,
        React.createElement(UserCard, null),
        React.createElement(NewProject, null),
        React.createElement(ProjectCard, { projectName: projects[0].projectName, allocation: projects[0].allocation })
      )
    );
  }
});

var UserCard = React.createClass({
  displayName: "UserCard",

  render: function render() {
    var chartInitialData = [{ label: "Project Bethesda", value: 22 }, { label: "Guide-Dogs", value: 60 }, { label: "Docker Hackfest", value: 18 }];
    var formatter = function formatter(x) {
      return x + "%";
    };
    var defaultChartColors = ['#6bafbd', '#65cea7', '#f3ce85', '#fc8675'];

    return React.createElement(
      "div",
      { className: "app-container" },
      React.createElement(
        "div",
        { className: "container-fluid" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-md-12 userHeader clearfix" },
            React.createElement(
              "div",
              null,
              React.createElement(
                "div",
                { className: "page-title" },
                React.createElement(
                  "div",
                  { className: "page-title" },
                  React.createElement(
                    "h3",
                    { className: "no-margin" },
                    React.createElement("img", { src: "assets/icon_grey_office365.png", width: "30", height: "30" }),
                    "Erik Schlegel"
                  ),
                  React.createElement(
                    "span",
                    { className: "dateLabel" },
                    "Week of October 5th"
                  )
                ),
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
                        "3"
                      )
                    )
                  ),
                  React.createElement(
                    "li",
                    null,
                    React.createElement(ResourceDonutChart, { data: chartInitialData, formatter: formatter,
                      colors: defaultChartColors })
                  )
                )
              ),
              React.createElement("div", { className: "collapse navbar-collapse", id: "navbar-collapse2" })
            )
          )
        )
      )
    );
  }
});

var ResourceDonutChart = React.createClass({
  displayName: "ResourceDonutChart",

  getInitialState: function getInitialState() {
    var chartData = this.props.data || [];

    return { chartData: chartData,
      formatter: this.props.formatter || false,
      colors: this.props.colors || false };
  },

  componentDidMount: function componentDidMount() {
    var self = this;

    if (this.state.chartData) {
      Morris.Donut({
        element: React.findDOMNode(self),
        data: this.state.chartData,
        resize: true,
        formatter: this.state.formatter,
        colors: this.state.colors
      });
    }
  },

  render: function render() {
    return React.createElement("div", { id: "projectChart", className: "chartStyle" });
  }
});

var ProjectCard = React.createClass({
  displayName: "ProjectCard",

  getInitialState: function getInitialState() {
    return { allocation: this.props.allocation || 0,
      projectName: this.props.projectName || '' };
  },

  componentDidMount: function componentDidMount() {
    var self = this;

    var slider = new Slider('#time-slide', {
      formatter: function formatter(value) {
        return 'Current value: ' + value + '%';
      }
    });

    slider.on('slide', function (item) {
      self.setState({ allocation: item });
    });
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "div",
        { className: "col-md-8 col-xs-8" },
        React.createElement(
          "div",
          { className: "panel panel-default projectcard-panel" },
          React.createElement(
            "div",
            { className: "panel-heading project-panel-heading" },
            React.createElement("img", { height: "30", width: "30", className: "project-icon", src: "assets/project_icon.png" }),
            React.createElement(
              "a",
              { href: "#" },
              React.createElement("i", { className: "fa fa-times-circle pull-right", style: { 'color': 'red' } })
            ),
            React.createElement(
              "h4",
              { className: "project-title-label" },
              React.createElement(
                "span",
                null,
                this.state.projectName
              ),
              React.createElement(
                "small",
                { className: "project-panel-heading-description" },
                this.state.allocation,
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
                React.createElement("input", { type: "text", className: "span2", value: "", "data-slider-min": "0", "data-slider-max": "100", "data-slider-step": "1", "data-slider-value": this.state.allocation, "data-slider-id": "BC", id: "time-slide", "data-slider-handle": "triangle" })
              )
            )
          )
        )
      )
    );
  }
});

var NewProject = React.createClass({
  displayName: "NewProject",

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
            { type: "button", className: "btn btn-success btn-sm" },
            React.createElement("span", { "class": "glyphicon glyphicon-star", "aria-hidden": "true" }),
            "Add Project"
          )
        )
      )
    );
  }
});

React.render(React.createElement(TimeCard, null), document.getElementById('app'));