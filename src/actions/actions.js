var constants = {
       PROJECT: {
         REMOVE: 'PROJECT:ITEM-REMOVE',
         EDIT: 'PROJECT:ITEM-EDIT',
         ADD: 'PROJECT:ITEM-ADD',
         LOAD: 'PROJECT:LOAD-CURRENT-WEEK',
         CHART_INIT: 'PROJECT:CHART_INIT',
         CHART_REFRESH: 'PROJECT:CHART_REFRESH'
       }
};

var methods = {
  PROJECT: {
      init_load: function(){
        var self = this;
        var defaultUsername = "Erik Schlegel";
        var defaultUserEmail = "erisch@microsoft.com"
        var userName = defaultUsername;//(typeof Office != 'undefined' && typeof Office.context != 'undefined')?Office.context.mailbox.userProfile.displayName:defaultUsername;
        var emailAddress = defaultUserEmail;//(typeof Office != 'undefined' && typeof Office.context != 'undefined')?Office.context.mailbox.userProfile.emailAddress:defaultUserEmail;
        var userAlias = (emailAddress && emailAddress.indexOf('@') != -1)?emailAddress.substring(0, emailAddress.indexOf('@')):"erisch";

        var serviceCB = {
            success: function(response){
              if(response && response.weekEndDate){
                self.dispatch(constants.PROJECT.LOAD, {
                      projects: response.entries || [],
                      userDisplayName: userName,
                      displayWeek: response.weekEndDate,
                      PartitionKey: response.PartitionKey,
                      RowKey: response.RowKey
                });
              }
            },
            failure: function(jqXHR, textStatus, error){
               console.error("Current Week service call error: " + error);
            }
        };

        SERVICES.currentWeekProjects(userAlias, serviceCB);
  },

  save_project: function(putRequest){
    var serviceCB = {
        success: function(response){
          $.notify({
          	// options
          	message: putRequest.projects.length + ' projects have been succesfully recorded. Happy coding!',
            title: 'Action Status',
            icon: 'glyphicon glyphicon-thumbs-up'
          },{
          	// settings
          	type: 'success'
          });
        },
        failure: function(jqXHR, textStatus, error){
          $.notify({
            // options
            message: 'Current Week service call error: ' + error,
            title: 'Action Status',
            icon: 'glyphicon glyphicon-thumbs-down'
          },{
            // settings
            type: 'danger'
          });
        }
    };

    if(putRequest.projects)
      SERVICES.saveProjects(putRequest.projects, putRequest.RowKey, putRequest.PartitionKey, serviceCB);
  },

  initialize_chart: function(properties, domNode){
    properties['domNode'] = domNode;

    this.dispatch(constants.PROJECT.CHART_INIT, properties);
  },

  refresh_chart: function(){
    this.dispatch(constants.PROJECT.CHART_REFRESH, {});
  },

  edit_project_item: function(project){
    this.dispatch(constants.PROJECT.EDIT, project);
  },

  add_project_item: function(project){
    this.dispatch(constants.PROJECT.ADD, project);
  },

  remove_project_item: function(projectName){
    this.dispatch(constants.PROJECT.REMOVE, projectName);
  }
}
};

var Actions = {
  constants: constants,
  methods: methods
};
