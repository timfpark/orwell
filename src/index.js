var TimeCard = React.createClass({
  render: function() {
    return (
        <div>
            <UserCard />
            <ProjectCard />
            <ProjectCard />
            <NewProject />

            <button>Submit</button>
        </div>
    );
  }
});


var UserCard = React.createClass({
  render: function() {
    return (
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
                <h2>Tim Park</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
                <h4>Week of October 5th</h4>
            </div>
          </div>
        </div>
    );
  }
});

var ProjectCard = React.createClass({
  render: function() {
    return (
    <div class="container-fluid">
      <form>
        <div class="row">
          <div class="col-md-12">
              <h3>Project 1: Stroeer</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
              <b>Time Allocation:</b>
              60%
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
              <b>Project Health:</b>

              <div class="btn-group" data-toggle="buttons">
                <label class="btn btn-primary active">
                    <input type="radio" name="health" value="happy" autocomplete="off" checked /> Happy
                </label>
                <label class="btn btn-primary">
                    <input type="radio" name="health" value="neutral" autocomplete="off"/> Neutral
                </label>
                <label class="btn btn-primary">
                    <input type="radio" name="health" value="sad" autocomplete="off"/> Sad
                </label>
                <label class="btn btn-primary">
                    <input type="radio" name="health" value="angry" autocomplete="off"/> Angry
                </label>
                <label class="btn btn-primary">
                    <input type="radio" name="health" value="stressed" autocomplete="off"/> Stressed
                </label>
              </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
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
      <div class="row">
        <div class="col-md-12">
            + Add a New Project
        </div>
      </div>
    );
  }
});

React.render(
  <TimeCard />,
  document.getElementById('form')
);
