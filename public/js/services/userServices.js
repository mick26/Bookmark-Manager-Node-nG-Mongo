'use strict';

/*================================================
Module - for the Services
================================================ */

angular.module('bookmarkApp.userServices', [])

.service('userService', function($http, $q, $window, base64, $rootScope, flash) {

  return {

    callFlashMessages : function() {
        $rootScope.info();
        $rootScope.warn();
        $rootScope.success();
        $rootScope.error();
    },

    clearFlashMessages :  function() {
      $rootScope.info = function () {
        flash.info = '';
      };
      $rootScope.warn = function () {
        flash.warn = '';
      };
      $rootScope.success = function () {
        flash.success = '';
      };
      $rootScope.error = function () {
        flash.error = '';
      };
    },


    loggedOnAlreadyMsg : function() {
      
      this.clearFlashMessages();
      $rootScope.info = function () {
        flash.info = 'You are logged on already!!';
      };
      this.callFlashMessages();
    },


    registerUser : function(user) {

      this.clearFlashMessages();
      var deferred = $q.defer();
      
        $http.post('/register', user)           
          .success(function(user) {    
            $rootScope.success = function () {
              flash.success = 'You are now Registered and can logon!';
            }; 
            deferred.resolve("Registered OK" + user);
          })

          .error(function(reason, status) {
            
            if(status==409) {          
              $rootScope.error = function () {
                flash.error = 'Duplicate username: Please select a different username';
              };
            }

            if(status==400) {
              $rootScope.error = function () {
                flash.error = 'Password Confirmation does not match Password';
              };
            };
            deferred.reject("OOPS Unable to Register User!!!" + reason);//TEST
          });
          return deferred.promise; //returns the promise    
    },



    loginUser : function(user) {

      this.clearFlashMessages();
      var deferred = $q.defer();
      
      $http.post('/login', user)      
        .success(function(user) { 
          base64.saveJwtToSessionStorage(user.token);
          var profile = base64.getJwtProfile();   
          $rootScope.success = function () {
            flash.success = 'You are now logged on!';
          }; 
          $rootScope.welcome = 'Welcome ' + JSON.stringify(profile.username) + " | ";
          deferred.resolve(profile);
        })

        .error(function(reason, status) {
          //Erase JWT token if the user fails to log in
          base64.deleteJwtFromSessionStorage(); 
          $rootScope.error = function () {
            flash.error = 'Invalid username or password!';
          };
          $rootScope.welcome = 'Invalid User';

          deferred.reject("OOPS Unable to Login!!!" + reason);//TEST
        });
        return deferred.promise; //returns the promise    
    },


    logoutUser : function() {

      this.clearFlashMessages();
      var deferred = $q.defer();
      
      $http.post('/logout')      
        .success(function(data, status) {           
          base64.deleteJwtFromSessionStorage();
          $rootScope.success = function () {
            flash.success = 'You have been logged out';
          };
          deferred.resolve("Success with logout" + data );
        })

        .error(function(reason, status) {
          $rootScope.error = function () {
            flash.error = 'Problem logging out';
          };
          $rootScope.welcome = 'Invalid User';
          deferred.reject("OOPS Unable to Logout!!!" + reason);//TEST
        });
        return deferred.promise; //returns the promise    
    }

  }  //@END return()
}); //@ EOF
