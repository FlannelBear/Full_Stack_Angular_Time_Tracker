app.controller('EntryController', ['TrackerService', function(TrackerService){
   let vm =  this;
   console.log('HomeController');

   vm.getEntries = function(){
      TrackerService.get('history', null).then(function(){
         vm.entryList = TrackerService.data;
      });
   }
   vm.getProjects = function(){
      TrackerService.get('project', null).then(function(){
         vm.projectList = TrackerService.data;
      });
   }

   vm.addEntry = function(){
      console.log(vm.descriptionIn);
      console.log(vm.projectIn);
      console.log(vm.dateIn);
      console.log(vm.startTimeIn);
      console.log(vm.endTimeIn);
      // TrackerService.post('history', data).then();
   }
   
   vm.getEntries();
   vm.getProjects();

}]);