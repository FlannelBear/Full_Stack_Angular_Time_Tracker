app.service('TrackerService', ['$http', function($http){
   console.log('In TrackerService');
   let sv = this;

   sv.get = function(url, param){
      return $http({
         method: 'GET',
         url: `/${url}`
      }).then(function(response){
         sv.data = response.data;
      }).catch(function(error){
         console.log(`Error handling GET for ${url}: ${error}`);
      });
   } // end GET

   sv.post = function(url, data){
      return $http({
         method: 'POST',
         url: `/${url}`,
         data: data
      }).then(function(response){
         console.log('POST handled');
      }).catch(function(error){
         console.log('Error handling POST in service', error);
      });
   } // end POST
}]);