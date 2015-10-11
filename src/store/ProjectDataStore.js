var ProjectDataStore = Fluxxor.createStore({
  initialize: function() {
    this.dataStore = {
       projects: [],
       userDisplayName: '',
       needMoreWork: false,
       displayWeek: false,
       chartData: [],
       chartObject: false
    };

    this.bindActions(
      Actions.constants.PROJECT.EDIT, this.handleProjectItemEdit,
      Actions.constants.PROJECT.ADD, this.handleProjectItemAdd,
      Actions.constants.PROJECT.REMOVE, this.handleProjectItemRemove,
      Actions.constants.PROJECT.LOAD, this.handleLoadProjects,
      Actions.constants.PROJECT.CHART_INIT, this.handleInitializeChart,
      Actions.constants.PROJECT.CHART_REFRESH, this.handleChartRefresh
    );
  },

  getState: function() {
    return this.dataStore;
  },

  handleInitializeChart(chartProps){
    if(this.dataStore.chartData){
      var self = this;

      this.dataStore.chartObject = Morris.Donut({
         element: chartProps.domNode,
         data: self.dataStore.chartData,
         resize: true,
         formatter: chartProps.formatter,
         colors: chartProps.colors
       });

      this.emit("change");
     }
  },

  handleChartRefresh(){
    if(this.dataStore.chartObject)
       this.dataStore.chartObject.setData(this.dataStore.chartData);
  },

  handleLoadProjects: function(payload){
      this.dataStore.projects = payload.projects;
      this.syncProjectsToChartData(payload.projects);
      this.dataStore.userDisplayName = payload.userDisplayName;
      this.dataStore.displayWeek = payload.displayWeek;
      this.dataStore.RowKey = payload.RowKey;
      this.dataStore.PartitionKey = payload.PartitionKey;

      this.emit("change");
  },

  syncProjectsToChartData: function(projects){
    this.dataStore.chartData = [];
    var self = this;

    projects.map(function(project){
        self.handleAddProjectToChart(project);
    });
  },

  handleAddProjectToChart(project){
    this.dataStore.chartData.push({label: project.projectName, value: project.timeAllocation});
  },

  handleProjectItemEdit: function(edittedItem){
     this.dataStore.projects = this.dataStore.projects.map(function(project){
         if(edittedItem.project.projectName === project.projectName)
            project = edittedItem.project;

         return project;
     });

     this.syncProjectsToChartData(this.dataStore.projects);
     this.handleChartRefresh();
     this.emit("change");
  },

  handleProjectItemAdd: function(newProject){
    this.dataStore.projects.push(newProject);
    this.handleAddProjectToChart(newProject);
    this.emit("change");
  },

  handleRemoveChartItem(projectName){
    var self = this;

    this.dataStore.chartData.map(function(project, index){
        if(projectName === project.label)
           self.dataStore.chartData.splice(index, 1);
    });
  },

  handleProjectItemRemove: function(projectName){
    var self = this;

    this.dataStore.projects.map(function(project, index){
        if(projectName === project.projectName)
           self.dataStore.projects.splice(index, 1);
    });

    this.handleRemoveChartItem(projectName);
    this.handleChartRefresh();

    this.emit("change");
  }
});
