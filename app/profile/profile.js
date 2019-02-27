angular.module('myApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add', {
    templateUrl: 'profile/profile.html',
    controller: 'profileCtrl',
  });
}])

.controller('profileCtrl', ['$scope','Auth','$firebaseArray','CommonProp','$location',function($scope,Auth,$firebaseArray,CommonProp,$location) {
    
  $scope.username = CommonProp.getUser();

    if($scope.username){
      $location.path('/add');
  }

  const ref = firebase.database().ref();

   // ========= Adding User ============= //

   $scope.users = $firebaseArray(ref.child("users").child("profile"));
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
       }).then(function(userID) {
        $location.path("/")
      }, function(error) {
        console.log(error)
      })
    }



}]);