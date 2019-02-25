'use strict';


// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'firebase',
  'myApp.view1',
  'myApp.user',
  'myApp.about',
  'myApp.contact',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.otherwise({redirectTo: '/'});
}]);
