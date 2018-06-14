const app = angular.module('TimeTracker', ['ngRoute', function($routeProvider){

   $routeProvider.when('/', {
      templateUrl: '../views/home.view.html',
      controller: 'HomeController as H'
   }).otherwise({
      template: '<h1>404 Page Not Found</h1><p>Press the back button to return to site</p>'
   });

}]);

