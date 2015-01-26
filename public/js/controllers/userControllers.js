/**********************************************************************
 * Module - For Controllers
 **********************************************************************/
'use strict';

angular.module('bookmarkApp.userControllers', [])

  /**********************************************************************
   Register controller
   **********************************************************************/
  .controller('RegisterCtrl', function ($scope, $http, $location, $window, $log, AuthenticationService, 
    $rootScope, base64, userService) {

    userService.clearFlashMessages();

    $scope.register = function register(username, password, passwordConfirm) {

      if (AuthenticationService.isLogged) {
          userService.loggedOnAlreadyMsg();
          userService.callFlashMessages();
          $location.path("/admin");
      }

      else {
        //Request
        userService.registerUser($scope.user)                                    
          //Response Handler
          .then(function(user) {   
            userService.callFlashMessages();
            $location.path("/login");
          },
          function(error) {
              userService.callFlashMessages();
          })        
      };
    }


    //If JWT exists in session storage i.e. user logged in
    //get username from JWT   
    if($window.sessionStorage.token) {
      //Request
      base64.getJwtProfile()    
        //Response Handler
        .then(function(profile) {
          $rootScope.welcome = 'You are Logged on as ' + JSON.stringify(profile.username) + " | ";
        },
        function(error) {
          log.error("Error getting token" + error);
        });
    }
})


/**********************************************************************
 * Login controller
 **********************************************************************/
.controller('LoginCtrl', function ($scope, $http, $location, $window, AuthenticationService, 
    userService) {

    $scope.login = function() {

      //Request
      userService.loginUser($scope.user)                                    
        //Response Handler
        .then(function(profile) {   
            AuthenticationService.isLogged = true;      //Logged In **              
            userService.callFlashMessages();
            $location.url('/');   
          },
          function(error) {
            AuthenticationService.isLogged = false; //NOT Logged In **
            userService.callFlashMessages();
          });
      }
  })


  /**********************************************************************
   * Logout controller
   **********************************************************************/
  .controller('LogoutCtrl', function ($scope, $http, $window, $location, 
    AuthenticationService, userService) {

      //Request
      userService.logoutUser()                                    
        //Response Handler
        .then(function(profile) {   
          AuthenticationService.isLogged = false;      //Logged In **              
          userService.callFlashMessages();
          $location.url('/');   
        },
        function(error) {
          AuthenticationService.isLogged = false; //NOT Logged In **
          userService.callFlashMessages();
        });
  });
