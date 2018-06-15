app.service('TrackerService', ['$http', function($http){
   console.log('In TrackerService');
   let sv = this;

   sv.get = function(url){
      // let paramIn = '';
      // let modifierIn = '';

      // param == null ? paramIn : paramIn = param;
      // modifier == null ? modifierIn : modifierIn = modifier;
      
      // const sort = `${paramIn} ${modifierIn}`;
      // const route = `${url}/${sort}`;
      
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

   sv.delete = function(url, id){
      return $http({
         method: 'DELETE',
         url: `/${url}/${id}`
      }).then(function(response){
         console.log('Delete handled');
      }).catch(function(error){
         console.log('Error handling DELETE for /history: ', error);
      });
   }
}]);