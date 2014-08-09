'use strict';

/*================================================================
Module - main module
=================================================================*/

angular.module('bookmarkApp', ['ngRoute', 'bookmarkApp.Controllers', 'bookmarkApp.Directives', 'colorpicker.module', 
  'bookmarkApp.userControllers', 'bookmarkApp.userServices', 'angular-flash.flash-alert-directive', 'angular-flash.service'])


.config( function($routeProvider, $locationProvider, $httpProvider) {

  /*==================================================
  Add Interceptor in the $httpProvider
  Adds Header to each request to server
  Header contains JWT Token 
  ================================================== */
  $httpProvider.interceptors.push('authInterceptor')
  

  /*================================================
  Define all the Routes
  ================================================ */
  $routeProvider

    .when('/', {
      templateUrl: 'views/register.tpl.html',
      controller  : 'RegisterCtrl',
      access: { requiredLogin: false }
    })

    .when('/about', {
      templateUrl: 'views/about.tpl.html',
      controller  : 'AboutCtrl',
  		access: { requiredLogin: false }
    })

    .when('/bookmarks', {
      templateUrl: 'views/bookmarks.tpl.html',
  		controller  : 'BookmarkCtrl',
      access: { requiredLogin: true }
    })

    .when('/login', {
      templateUrl: 'views/login.tpl.html',
      controller: 'LoginCtrl',
      access: { requiredLogin: true }
    })


    .when('/logout', {
      templateUrl: 'views/login.tpl.html',
      controller: 'LogoutCtrl',
      access: { requiredLogin: true }
    })

    .otherwise( {
      redirectTo: '/',
      access: { requiredLogin: false }
    })
})


.run( function($rootScope, $location, $window, AuthenticationService) {
  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {

    //redirect only if both isAuthenticated is false and no token is set
        if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredLogin 
            && !AuthenticationService.isLogged && !$window.sessionStorage.token) {
      
            $location.path("/login"); 
    }
  });
  

})


//Ref. polifyll https://github.com/davidchambers/Base64.js
//this is used to parse the profile contained in the JWT
function url_base64_decode(str) 
{
  var output = str.replace('-', '+').replace('_', '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }
  return window.atob(output); 
};





