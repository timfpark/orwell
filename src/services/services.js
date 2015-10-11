var serviceHost = "http://orwellapi.azurewebsites.net/"

var SERVICES = {
  currentWeekProjects: function(alias, cb){
    $.get("{0}/week/current/{1}".format(serviceHost, alias), cb.success)
    .fail(cb.failure);
  },
  saveProjects: function(projects, rowKey, partitionKey, cb){
    var putRequest = {
      entries: projects,
      PartitionKey: partitionKey,
      RowKey: rowKey
    };

    $.ajax({
            url: "{0}/week/current/{1}".format(serviceHost, rowKey),
            type: 'PUT',
            data: putRequest,
            success: cb.success,
            fail: cb.failure
          });
  }
};
