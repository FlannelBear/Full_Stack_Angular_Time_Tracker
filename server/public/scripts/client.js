const app = angular.module('TimeTracker', ['ngRoute', 'ngMaterial']);

app.config(function($routeProvider, $mdThemingProvider){
   $mdThemingProvider.theme('default')
   .primaryPalette('blue')
   .accentPalette('purple')
   .backgroundPalette('blue')
   .warnPalette('orange');

   $routeProvider.when('/', {
      templateUrl: '../views/entry.view.html',
      controller: 'EntryController as EC'
   }).when('/project', {
      templateUrl: '../views/project.view.html',
      controller: 'ProjectController as PC'
   }).when('/report', {
      templateUrl: '../views/report.view.html',
      controller: 'ReportController as RC'
   }).otherwise({
      template: '<h1>404 Page Not Found</h1><p>Press the back button to return to site</p>'
   });
});

