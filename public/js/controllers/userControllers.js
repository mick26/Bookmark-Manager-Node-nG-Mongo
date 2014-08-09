
/**********************************************************************
 * Module - For Controllers
 **********************************************************************/

'use strict';

angular.module('bookmarkApp.userControllers', [])



  /**********************************************************************
   Register controller
   **********************************************************************/
  .controller('RegisterCtrl', function ($scope, $http, $location, $window, AuthenticationService, $rootScope, flash) {

    //for angular-flash messages
    $scope.all = function () {
        $scope.info();
        $scope.warn();
        $scope.success();
        $scope.error();
    };

    $scope.register = function register(username, password, passwordConfirm) {

        if (AuthenticationService.isLogged) {
          
          //Flash Messages
          $scope.info = function () {
            flash.info = 'You are logged on already!!';
          };
          $scope.warn = function () {
            flash.warn = '';
          };
          $scope.success = function () {
            flash.success = '';
          };
          $scope.error = function () {
            flash.error = '';
          };
          $scope.all();

          $location.path("/admin");
        }
        else {
          //console.info("scope.register= " +$scope.user);  //TEST

          $http.post('/register', $scope.user) 
            .success(function(data, status, headers, config)  {

                //Flash Messages
                $scope.info = function () {
                  flash.info = '';
                };
                $scope.warn = function () {
                  flash.warn = '';
                };
                $scope.success = function () {
                  flash.success = 'You are now Registered and can logon!';
                };
                $scope.error = function () {
                  flash.error = '';
                };
                $scope.all();
                
                $location.path("/login");
            })

            .error(function(data, status, headers, config) {

                //Flash Messages
                $scope.info = function () {
                  flash.info = '';
                };
                $scope.warn = function () {
                  flash.warn = '';
                };
                $scope.success = function () {
                  flash.success = '';
                };

                if(status==409) {
                  $scope.error = function () {
                    flash.error = 'Duplicate username: Please select a different username';
                  };
                  $scope.all();
                }

                if(status==400) {
                  $scope.error = function () {
                    flash.error = 'Password Confirmation does not match Password';
                  };
                  $scope.all();
                }
            });
        }
    };

    //If JWT exists in session storage i.e. user logged in
    //get username from JWT
   
    if($window.sessionStorage.token) {
        var encodedProfile =$window.sessionStorage.token.split('.')[1];
        var profile = JSON.parse(url_base64_decode(encodedProfile));
        //console.log("***profile = " + JSON.stringify(profile));            //TEST
        $rootScope.welcome = 'Welcome ' + JSON.stringify(profile.username);  
    }

  })



/**********************************************************************
 * Login controller
 **********************************************************************/
.controller('LoginCtrl', function ($scope, $http, $location, $window, AuthenticationService, $rootScope, flash) {

  //for Flash messages
  $scope.all = function () {
      $scope.info();
      $scope.warn();
      $scope.success();
      $scope.error();
  };


  $scope.login = function () {

    $http.post('/login', $scope.user)      
      //success
    .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;  //save JWT to sessionStorage.
        AuthenticationService.isLogged = true;		  //Logged In **
	
		    var encodedProfile = data.token.split('.')[1];
        var profile = JSON.parse(url_base64_decode(encodedProfile));
		
    		console.log("profile = " + JSON.stringify(profile));			    //TEST
    		
        //console.log("user_id = " + JSON.stringify(profile.user_id));  //TEST
        //console.log("Email = " + JSON.stringify(profile.email));		  //TEST
        //console.log("Username = " + JSON.stringify(profile.username));//TEST

    		//Flash Messages
        $scope.info = function () {
          flash.info = '';
        };
        $scope.warn = function () {
          flash.warn = '';
        };
        $scope.success = function () {
          flash.success = 'You are now logged on!';
        };
        $scope.error = function () {
          flash.error = '';
        };
        $scope.all();
        
        $rootScope.welcome = 'Welcome ' + JSON.stringify(profile.username);

        $location.url('/');		
    })
      
    //error
    .error(function (data, status, headers, config) {
    		
  	 	  //Erase JWT token if the user fails to log in
        delete $window.sessionStorage.token;        
  		  AuthenticationService.isLogged = false;	//NOT Logged In **
 
  		  //Handle login errors here
        //Flash Messages
        $scope.info = function () {
          flash.info = '';
        };
        $scope.warn = function () {
          flash.warn = '';
        };
        $scope.success = function () {
          flash.success = '';
        };
        $scope.error = function () {
          flash.error = 'Invalid username or password!';
        };
        $scope.all();
        
        $scope.welcome = 'Invalid User';
    });
  }  
})



/**********************************************************************
 * Logout controller
 **********************************************************************/
.controller('LogoutCtrl', function ($scope, $http, $window, $location, AuthenticationService, $rootScope, flash) {

    //for Flash messages
    $scope.all = function () {
      $scope.info();
      $scope.warn();
      $scope.success();
      $scope.error();
    };


		$http.post('/logout') 
		//success
		.success(function (data, status, headers, config) {
  		AuthenticationService.isLogged = false;		// Logged In **
  		//console.log("AuthenticationService.isLogged= "+ AuthenticationService.isLogged ); TEST
  		//Erase JWT token if the user fails to log in
  		delete $window.sessionStorage.token; 

      //Flash Messages
      $scope.info = function () {
        flash.info = '';
      };
      $scope.warn = function () {
        flash.warn = '';
      };
      $scope.success = function () {
        flash.success = 'You have been logged out';
      };
      $scope.error = function () {
        flash.error = '';
      };
      $scope.all();

  		
      $location.url('/');
		})
    
		//error
		.error(function (data, status, headers, config) {
			
      //Flash Messages
      $scope.info = function () {
        flash.info = '';
      };
      $scope.warn = function () {
        flash.warn = '';
      };
      $scope.success = function () {
        flash.success = '';
      };
      $scope.error = function () {
        flash.error = 'Problem logging out';
      };
      $scope.all();

		});
});

