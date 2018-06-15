app.controller('EntryController', ['TrackerService', function(TrackerService){
   let vm =  this;
   console.log('HomeController');

   vm.getEntries = function(){
      TrackerService.get('history').then(function(){
         vm.entryList = TrackerService.data;
      });
   }
   vm.getProjects = function(){
      TrackerService.get('project').then(function(){
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
      TrackerService.delete('history', click.entry.entry_id, null).then(function(){
         vm.getEntries();
      });
   }

   // let modifier = 'asc';
   // vm.sortEntries = function(param){
   //    modifier == 'asc' ? modifier = 'desc' : modifier = 'asc';
   //    TrackerService.get('history').then(function(){
         
   //    });
   // }
   
   vm.getEntries();
   vm.getProjects();

}]);