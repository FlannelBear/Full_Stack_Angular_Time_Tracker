app.controller('EntryController', ['TrackerService', '$mdDialog', function(TrackerService, $mdDialog){
   let vm =  this;
   console.log('HomeController');

   vm.getEntries = function(){
      TrackerService.get('history').then(function(){
         vm.entryList = TrackerService.data;
      });
   }
   vm.getProjects = function(){
      TrackerService.get('project/all').then(function(){
        console.log(TrackerService.data);
         vm.projectList = TrackerService.data;
      });
   }

   vm.addEntry = function(){
      const entry = new Entry(vm.descriptionIn, vm.dateIn, vm.startTimeIn, vm.endTimeIn, vm.projectIn);
      entry.date = entry.formatDate();
      entry.hours = entry.getHours();
      console.log(entry);
      TrackerService.post('history', entry).then(function(){
         vm.getEntries();
      });
   }

   vm.deleteEntry = function(click){
      TrackerService.delete('history', click.entry.entry_id).then(function(){
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
          const B = b.project.toLowerCase();
          const A = a.project.toLowerCase();
          return B < A ? -1 : B > A ? 1 : 0; 
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
          const A = a.project.toLowerCase();
          const B = b.project.toLowerCase();
          return A < B ? -1 : A > B ? 1 : 0; 
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
    
  
    vm.editEntry = function (ev, click) {
      let editId = click.entry.entry_id;
      let parentEl = angular.element(document.getElementById('#popupContainer'));
      $mdDialog.show({
        parent: parentEl,
        targetEvent: ev,
        template:
          `<md-dialog aria-label="List dialog" class="padded">
            <md-dialog-content>
            <h3>Edit the time of the entry</h3>
            <p>Enter the start and end times</p>
            <md-input-container>
              <input type="time" ng-model="newStartTimeIn" placeholder="start time"/>
            </md-input-container>
            <md-input-container>
              <input type="time" ng-model="newEndTimeIn" placeholder="end time"/>
            </md-input-container>
            </md-dialog-content>
            <md-dialog-actions>
            <md-button ng-click="closeDialog()" class="md-warn md-raised">Close</md-button>
              <md-button ng-click="sendEdit()" class="md-accent md-raised">
                Update
              </md-button>
            </md-dialog-actions>
          </md-dialog>`,
          controller: function DialogController($scope, $mdDialog) {
            $scope.sendEdit = function() {
              const edit = new Entry(null, null, $scope.newStartTimeIn, $scope.newEndTimeIn, null);
              console.log(edit);
              edit.hours = edit.getHours();
              TrackerService.put('history', edit, editId).then(function(){
                vm.getEntries();
              });
              $mdDialog.hide();
            }
            $scope.closeDialog = function(){
              $mdDialog.hide();
            }
          }

      });
    }
}]);

