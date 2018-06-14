const app = angular.module('TimeTracker', ['ngRoute', function($routeProvider){

   $routeProvider.when('/', {
      templateUrl: '../views/entry.view.html',
      controller: 'EntryController as EC'
   }).otherwise({
      template: '<h1>404 Page Not Found</h1><p>Press the back button to return to site</p>'
   });

}]);

