'use strict';

angular.module('myApp.user', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'user/user.html',
    controller: 'UserCtrl',
  });
}])

.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
])

// and use it in our controller
.controller("UserCtrl", ["$scope", "Auth","$location",
  function($scope, Auth,$location) {
    
     // any time auth state changes, add the user data to scope
     $scope.auth = Auth;
     $scope.auth.$onAuthStateChanged(function(firebaseUser) {
       $scope.firebaseUser = firebaseUser;
       console.log(firebaseUser.uid)
     })
 

    
    $scope.signIn = function(){
        var username = $scope.email;
        var password = $scope.password;
    
        Auth.$signInWithEmailAndPassword(username, password).then(function(firebaseUser){
          console.log("User Login Successful " + $scope.firebaseUser.uid);
          $location.path('/');
        }).catch(function(error){
            console.log(error)
          $scope.errMsg = true;
          $scope.errorMessage = error.message;
        });
    }
  

    $scope.deleteUser = function() {
      $scope.message = null;
      $scope.error = null;

      // Delete the currently signed-in user
      Auth.$deleteUser().then(function() {
        $scope.message = "User deleted";
      }).catch(function(error) {
        $scope.error = error;
      });
    };
  }
]);