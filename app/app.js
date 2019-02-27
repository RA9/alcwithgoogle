'use strict';


// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'firebase',
  'myApp.view1',
  'myApp.about',
  'myApp.contact',
  'myApp.dashboard',
  'myApp.version'
])

.factory("Auth", ["$firebaseAuth",
function($firebaseAuth) {
  return $firebaseAuth();
}
])


.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.otherwise({redirectTo: '/'});
}]);
