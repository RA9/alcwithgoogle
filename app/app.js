'use strict';


// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'firebase',
  'myApp.view1',
  'myApp.about',
  'myApp.contact',
  'myApp.version'
])

.factory('authService',['$firebaseAuth','firebaseDataService','cityTimerService',
  function($firebaseAuth, firebaseDataService, cityTimerService) {

    var firebaseAuthObject = $firebaseAuth();
    var service = {

       firebaseAuthObject: firebaseAuthObject,

       register: register,

       login: login,

       logout: logout,

       isLoggedIn: isLoggedIn,

       sendWelcomeEmail: sendWelcomeEmail

    };

    return service;

    ////////////

    function register(user) {

       return firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password);

    }

    function login(user) {

       return firebaseAuthObject.$signInWithEmailAndPassword(user.email, user.password);

    }

    function logout() {

       cityTimerService.reset();

       firebaseAuthObject.$signOut();

    }

    function isLoggedIn() {

       return firebaseAuthObject.$getAuth();

    }

    function sendWelcomeEmail(emailAddress) {

       firebaseDataService.emails.push({

           emailAddress: emailAddress

       });

    }

}])


.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.otherwise({redirectTo: '/'});
}]);
