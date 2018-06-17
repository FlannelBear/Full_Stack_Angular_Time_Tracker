app.controller('ProjectController', ['TrackerService', function(TrackerService){
   const vm = this;

   // vm.getProjects = function(){
   //    TrackerService.get('project/all').then(function(){
   //       vm.nameList = TrackerService.data;
   //       console.log(vm.nameList);
   //    });
   // } // end getProjects
   // vm.getHours = function(){
   //    TrackerService.get('project/hours').then(function(){
   //       vm.hoursList = TrackerService.data;
   //       console.log(vm.hoursList);
   //    });
   // }

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