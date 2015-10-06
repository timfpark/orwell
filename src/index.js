var TimeForm = React.createClass({
  render: function() {
    return (
        <div class="container">
            <UserCard />
            <ProjectCard />
            <ProjectCard />
            <NewProject />
        </div>
    );
  }
});

var UserCard = React.createClass({
  render: function() {
    return (
        <div class="container">
          <div class="row">
            <div class="col-md-12">
                Tim Park
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
                Week of October 5th
            </div>
          </div>
        </div>
    );
  }
});

var ProjectCard = React.createClass({
  render: function() {
    return (
      <div class="row">
        <div class="col-md-12">
            A Project Card!
        </div>
      </div>
    );
  }
});

var NewProject = React.createClass({
  render: function() {
    return (
      <div class="row">
        <div class="col-md-12">
            + Add a New Project
        </div>
      </div>
    );
  }
});

React.render(
  <TimeForm />,
  document.getElementById('form')
);
