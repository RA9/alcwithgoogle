angular.module('myApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add', {
    templateUrl: 'profile/profile.html',
    controller: 'profileCtrl',
  });
}])

.factory("Auth", ["$firebaseAuth",
function($firebaseAuth) {
  return $firebaseAuth();
}
])

.controller('profileCtrl', ['$scope','Auth','$firebaseArray','$location',function($scope,Auth,$firebaseArray,CommonProp,$location) {
    
  
  $scope.auth =  Auth;
  $scope.auth.$onAuthStateChanged(function(firebaseUser) {
    $scope.firebaseUser = firebaseUser;
  })


  const ref = firebase.database().ref();

   // ========= Adding User ============= //
   
   // add new items to the array
   // the message is automatically added to our Firebase database!
   $scope.addUser = function() {
    $scope.users = $firebaseArray(ref.child("users/" + $scope.firebaseUser.uid).child("profile"));
    if(!$scope.users) {
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
      }).then(function(users) {
        $scope.name = "";
        $scope.img = "";
        $scope.description = "";
        $scope.age = "";
        $scope.occupation = "";
        $scope.github = "";
        $scope.twitter = "";
        $scope.facebook = "";
        $scope.linkedin = "";
        console.log("User created Successfully " + users)
       $location.path("#!")
     }, function(error) {
       console.log(error)
     })
    } else {
      $scope.name = "";
        $scope.img = "";
        $scope.description = "";
        $scope.age = "";
        $scope.occupation = "";
        $scope.github = "";
        $scope.twitter = "";
        $scope.facebook = "";
        $scope.linkedin = "";
      alert("User profile already exist")
    }
      
   
    
  
  }

}]);