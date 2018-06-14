app.controller('EntryController', ['TrackerService', function(TrackerService){
   let vm =  this;
   console.log('HomeController');

   vm.getEntries = function(){
      TrackerService.get('history', null).then(function(){
         vm.entryList = TrackerService.data;
      });
   }
   
   vm.getEntries();

}]);