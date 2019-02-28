'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'ViewCtrl',
  });
}])



.controller('ViewCtrl', ['$scope','Auth','$firebaseArray','$firebaseObject','CommonProp','$location',function($scope,Auth,$firebaseArray,$firebaseObject,CommonProp,$location) {
    
  $scope.username = CommonProp.getUser();

    if($scope.username){
      $location.path('/');
  }

  const ref = firebase.database().ref();
    // download the data into a local object
    const syncObject = $firebaseObject(ref.child("users").child("profile"));
    console.log(syncObject)
    // synchronize the object with a three-way data binding
    syncObject.$bindTo($scope, "profile");


    $scope.editUser = function(id) {
      if($scope.username) {
        const userID = ref.child("users").child("profile/" + id)
      $scope.editUserData = $firebaseObject(userID)
      }
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

   

    // ======= User Authentication =======
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

    $scope.signIn = function(){
      var username = $scope.user.email;
      var password = $scope.user.password;
  
      Auth.$signInWithEmailAndPassword(username, password).then(function(){
        console.log("User Login Successful");
        CommonProp.setUser($scope.user.email);
        $location.path('/');
      }).catch(function(error){
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

    $scope.isChecked = $scope.username;

    
}]);