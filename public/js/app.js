'use strict';

/*================================================================
Module - main module
=================================================================*/

angular.module('bookmarkApp', ['ngRoute', 'bookmarkApp.controllers', 'bookmarkApp.Directives', 'colorpicker.module', 
  'bookmarkApp.userControllers', 'bookmarkApp.authServices', 'bookmarkApp.ajaxServices', 
  'angular-flash.flash-alert-directive', 'angular-flash.service', 'bookmarkApp.base64Service'])

.config(window.$QDecorator)


.config(function($routeProvider, $locationProvider, $httpProvider) {

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
  
});
