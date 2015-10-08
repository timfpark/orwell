var action_methods = {
  SEARCH: {
      submit: function(query, itemId){
        const results = invokeSearchRequest(query, itemId);

        this.dispatch(constants.SEARCH_RESULTS.LOAD, {
              results: results
        });
      }
  }
};
