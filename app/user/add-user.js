'use strict';

angular.module('myApp.user', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/create', {
    templateUrl: 'user/add-user.html',
    controller: 'AddUserCtrl'
  });
}])

.controller('AddUserCtrl', ['$scope','$firebaseArray',function($scope,$firebaseArray) {
  const ref = firebase.database().ref().child("users");
    // create a synchronized array
    $scope.users = $firebaseArray(ref);
    // add new items to the array
    // the message is automatically added to our Firebase database!
    $scope.addUser = function() {
      console.log("Adding......")
      $scope.users.$add({
        name: $scope.name,
        img: $scope.img,
        description: $scope.description,
        age: $scope.age,
        occupation: $scope.occupation,
        github: {
          icon: "fa fa-github",
          title: "Github",
          url: $scope.github
        },
        linkedin: {
          icon: "fa fa-linkedin",
          title: "LinkedIn",
          url: $scope.linkedin
        },
        twitter: {
          icon: "fa fa-twitter",
          title: "Twitter",
          url: $scope.twitter
        },
        facebook: {
          icon: "fa fa-facebook",
          title: "Facebook",
          url: $scope.facebook
        }
      });
    };
}]);