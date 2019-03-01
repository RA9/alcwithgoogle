'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl',
  });
}])

// and use it in our controller
.controller("RegisterCtrl", ["$scope", "Auth","$location",
  function($scope, Auth,$location) {

$scope.createUser = function() {
    $scope.message = null;
    $scope.error = null;

    // Create a new user
    Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
      .then(function(firebaseUser) {
        $scope.message = "User created with uid: " + firebaseUser.uid;
        $location.path('/');
      }).catch(function(error) {
        $scope.error = error;
      });
  };

}])