'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'ViewCtrl',
  });
}])



.controller('ViewCtrl', ['$scope','$firebaseObject','$location',function($scope,$firebaseObject,CommonProp,$location) {
    
  const ref = firebase.database().ref();
    // download the data into a local object
    const syncObject = $firebaseObject(ref.child("users").child("profile"));
    console.log(syncObject)
    // synchronize the object with a three-way data binding
    syncObject.$bindTo($scope, "profile");


    $scope.editUser = function(id) {
        const userID = ref.child("users").child("profile/" + id)
      $scope.editUserData = $firebaseObject(userID)
      console.log($scope.editUserData)
    }

    $scope.saveUserData = function(id) {
      var userID = ref.child("users").child("profile/" + id)
      userID.update({
        name: $scope.editUserData.name,
        img: $scope.editUserData.img,
        description: $scope.editUserData.description,
        age: $scope.editUserData.age,
        occupation: $scope.editUserData.occupation,
        github: {
          icon: "fa fa-github",
          title: "Github",
          url: $scope.editUserData.github.url
        },
        linkedin: {
          icon: "fa fa-linkedin",
          title: "LinkedIn",
          url: $scope.editUserData.linkedin.url
        },
        twitter: {
          icon: "fa fa-twitter",
          title: "Twitter",
          url: $scope.editUserData.twitter.url
        },
        facebook: {
          icon: "fa fa-facebook",
          title: "facebook",
          url: $scope.editUserData.facebook.url
        }
      }).then(function(userID) {
        $("#exampleModal").modal("hide")
      }, function(error) {
        console.log(error)
      })
    }

  
    
}]);