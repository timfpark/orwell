"use strict";

var TimeCard = React.createClass({
  displayName: "TimeCard",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(UserCard, null),
      React.createElement(NewProject, null),
      React.createElement(
        "button",
        null,
        "Submit"
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

  render: function render() {
    return React.createElement(
      "div",
      { className: "container-fluid" },
      React.createElement(
        "form",
        null,
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-md-12" },
            React.createElement(
              "h3",
              null,
              "Project 1: Stroeer"
            )
          )
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-md-12" },
            React.createElement(
              "b",
              null,
              "Time Allocation:"
            ),
            "60%"
          )
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-md-12" },
            React.createElement(
              "b",
              null,
              "Project Health:"
            ),
            React.createElement(
              "div",
              { className: "btn-group", "data-toggle": "buttons" },
              React.createElement(
                "label",
                { className: "btn btn-primary active" },
                React.createElement("input", { type: "radio", name: "health", value: "happy", autocomplete: "off", checked: true }),
                " Happy"
              ),
              React.createElement(
                "label",
                { className: "btn btn-primary" },
                React.createElement("input", { type: "radio", name: "health", value: "neutral", autocomplete: "off" }),
                " Neutral"
              ),
              React.createElement(
                "label",
                { className: "btn btn-primary" },
                React.createElement("input", { type: "radio", name: "health", value: "sad", autocomplete: "off" }),
                " Sad"
              ),
              React.createElement(
                "label",
                { className: "btn btn-primary" },
                React.createElement("input", { type: "radio", name: "health", value: "angry", autocomplete: "off" }),
                " Angry"
              ),
              React.createElement(
                "label",
                { className: "btn btn-primary" },
                React.createElement("input", { type: "radio", name: "health", value: "stressed", autocomplete: "off" }),
                " Stressed"
              )
            )
          )
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-md-12" },
            React.createElement(
              "textarea",
              { rows: "4", cols: "50" },
              "* Did a thing * Did another thing * Yet another thing"
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
        "+ Add a New Project"
      )
    );
  }
});

React.render(React.createElement(TimeCard, null), document.getElementById('app'));