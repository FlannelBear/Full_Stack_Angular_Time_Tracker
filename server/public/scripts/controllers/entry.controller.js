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
      const entry = new Entry(vm.descriptionIn, vm.dateIn, vm.startTimeIn, vm.endTimeIn, vm.projectIn);
      entry.date = entry.formatDate();
      entry.hours = entry.getHours();
      TrackerService.post('history', entry).then(function(){
         vm.getEntries();
      });
   }

   vm.deleteEntry = function(click){
      console.log(click);
   }
   
   vm.getEntries();
   vm.getProjects();

}]);