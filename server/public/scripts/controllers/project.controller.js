app.controller('ProjectController', ['TrackerService', '$mdDialog', function(TrackerService, $mdDialog){
   const vm = this;

   vm.displayProjects = function(){
      TrackerService.get('project/hours').then(function(){
         console.log(TrackerService.data);
         vm.projectList = TrackerService.data;
      });
   }
   
   vm.addProject = function(){
      let project = new Project(vm.titleIn)
      TrackerService.post('project', project).then(function(){
         vm.displayProjects();
         vm.clearInputs();
      });
   } // end addProject

   vm.deleteProject = function(click){
      console.log(click.project.id);
      TrackerService.delete('project', click.project.id).then(function(){
         vm.displayProjects();
      });
   }

   vm.displayProjects();

   vm.clearInputs = function(){
     vm.titleIn = '';
   }

   vm.editProject = function (ev, click) {
      let editId = click.project.id;
      let parentEl = angular.element(document.getElementById('#popupContainer'));
      $mdDialog.show({
        parent: parentEl,
        targetEvent: ev,
        template:
          `<md-dialog aria-label="List dialog" class="padded">
            <md-dialog-content>
            <h3>Edit the name of a project</h3>
            <md-input-container>
              <input type="text" ng-model="newTitleIn" placeholder="Project Name"/>
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
              const edit = new Project($scope.newTitleIn);
              console.log(edit);
              TrackerService.put('project', edit, editId).then(function(){
                vm.displayProjects();
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