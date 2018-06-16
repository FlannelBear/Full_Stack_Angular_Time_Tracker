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
      let projects = [];
      let names = [];
      TrackerService.get('project/all').then(function(){
         names = TrackerService.data;
         console.log(names);
      });
      let hours = [];
      TrackerService.get('project/hours').then(function(){
         hours = TrackerService.data;  
         console.log(hours); 
         for(let i = 0; i < names.length; i++){
            if(i < hours.length){
            names[i].id == hours[i].id ? projects.push({project: names[i], hours: hours[i].hours}) : hours;
            } else {
               projects.push({project: names[i], hours: 0});
            } 
         }      
         console.log(projects);
      });
      vm.projectList = projects;
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