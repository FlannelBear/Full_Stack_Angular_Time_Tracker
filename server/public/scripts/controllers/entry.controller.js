app.controller('EntryController', ['TrackerService', function(TrackerService){
   let vm =  this;
   console.log('HomeController');

   vm.getEntries = function(){
      TrackerService.get('history').then(function(){
         vm.entryList = TrackerService.data;
      });
   }
   vm.getProjects = function(){
      TrackerService.get('project/all').then(function(){
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

   let clicked = false;
   vm.sortEntries = function(click){
      clicked = !clicked;
      
      clicked == true ? sortA(click) : sortB(click);
   }

   sortB = function(click){
      if(click == 'description'){
         vm.entryList = vm.entryList.sort(function(a, b) {
            const B = b.description.toLowerCase();
            const A = a.description.toLowerCase();
            return B < A ? -1 : B > A ? 1 : 0;
          });
          console.log(vm.entryList);
      } else if(click == 'project'){
         vm.entryList = vm.entryList.sort(function(a, b) {
            return b.project_id - a.project_id;
          });
      } else if(click == 'date'){
         vm.entryList = vm.entryList.sort(function(a, b) {
            return Date.parse(b.date) - Date.parse(a.date);
          });
      } else if(click == 'hours'){
         vm.entryList = vm.entryList.sort(function(a, b) {
            return b.hours - a.hours;
          });
      }
   }

   sortA = function(click){
      if(click == 'description'){
         vm.entryList = vm.entryList.sort(function(a, b) {
            const A = a.description.toLowerCase();
            const B = b.description.toLowerCase();
            return A < B ? -1 : A > B ? 1 : 0;           
          });
      } else if(click == 'project'){
         vm.entryList = vm.entryList.sort(function(a, b) {
            return a.project_id - b.project_id;
          });
      } else if(click == 'date'){
         vm.entryList = vm.entryList.sort(function(a, b) {
            return Date.parse(a.date) - Date.parse(b.date);
          });
      } else if(click == 'hours'){
         vm.entryList = vm.entryList.sort(function(a, b) {
            return a.hours - b.hours;
          });
      }
   }
   
   vm.getEntries();
   vm.getProjects();

}]);