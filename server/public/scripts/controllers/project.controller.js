app.controller('ProjectController', ['TrackerService', function(TrackerService){
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
      });
   } // end addProject

   vm.deleteProject = function(click){
      console.log(click.project.project.id);
      TrackerService.delete('project', click.project.project.id).then(function(){
         vm.displayProjects();
      });
   }

   vm.displayProjects();
}]);