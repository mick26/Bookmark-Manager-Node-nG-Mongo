'use strict';

/*================================================================
Module - Controllers module
=================================================================*/
angular.module('bookmarkApp.bookmarkControllers', [])

/*================================================================
Controller
=================================================================*/
.controller('BookmarkCtrl', function($scope, $location, $window, $rootScope, 
	bookmarkService, AuthenticationService, $log, base64) {

	$scope.bookmarks = {};
	$scope.tags = {};

	/* ========================================================== 
	GET bookmarks
	============================================================ */	

    /**
     * ERROR REPORTING
     *
     * Called by catch() if error (promise rejections or exceptions) occur
     */
    var reportProblems = function(fault) {
        $log.error( "OOH No!!: " + String(fault));
        $location.url('/login');
      	//Erase JWT token
      	base64.deleteJwtFromSessionStorage();
      	AuthenticationService.isLogged = false;    // Logged Out
    };

    var reportProblemsDelTagFromBk = function(fault) {
        $log.error( "OOH No!!: " + String(fault));
    };


    //Request
    bookmarkService.getBookmarks()                                    
	    //Response Handler
	    .then(function(bookmarks) {
	        $scope.bookmarks = bookmarks; 
	        return bookmarkService
	    })
	    .catch(reportProblems); //same as: promise.then(null, errorCallback)


	//Request
	base64.getJwtProfile()  
		// Response Handler
	    .then(function(profile) {
	    	//console.log("USERName= "+user)
			$rootScope.welcome = 'You are Logged on as ' + JSON.stringify(profile.username) + " | ";
	    })      
		.catch(reportProblems); //same as: promise.then(null, errorCallback)


	/* ========================================================== 
	GET tags
	============================================================ */	
    //Level 1 - Request #1
    bookmarkService.getTags()                                    
        //Response Handler #1
        .then(function(tags) {
            $scope.tags = tags; 
            return bookmarkService

            //Level 2
			//Request #2
	        base64.getUser()  
        		// Response Handler #2
                .then(function(profile) {
                	console.log("USERName= "+profile.user)
   					$rootScope.welcome = 'You are Logged on as ' + JSON.stringify(profile.user) + " | ";
                });
        })        
        .catch(reportProblems); //same as: promise.then(null, errorCallback)


	/* ========================================================== 
	Add bookmark - bookmark.tags, bookmark.link
	============================================================ */			
	$scope.addBookmark = function(bookmark) {

		//Level 1 - Request #1
	    bookmarkService.addBookmark(bookmark)                                    
	    	//Response Handler #1
	        .then(function(bookmarks) {
	            $scope.bookmarks = bookmarks; 
	        })        
	        .catch(reportProblems); //same as: promise.then(null, errorCallback)
	};


	/* ========================================================== 
	DELETE bookmark
	============================================================ */			
	$scope.deleteBookmark = function(bookmark) {

		//Level 1 - Request #1
	    bookmarkService.deleteBookmark(bookmark)                                    
	        //Response Handler #1
	        .then(function(bookmarks) {
	            $scope.bookmarks = bookmarks; 
	        })        
	        .catch(reportProblems); //same as: promise.then(null, errorCallback)
	};


	/* ========================================================== 
	ADD tag - tag.name,	tag.color
	============================================================ */		
	$scope.addTag = function(tag) {
		//Level 1 - Request #1
	    bookmarkService.addTag(tag)                                    
	    	//Response Handler #1
	        .then(function(tags) {
	            $scope.tags = tags; 
	        })        
	        .catch(reportProblems); //same as: promise.then(null, errorCallback)		};
	};

	/* ========================================================== 
	DELETE tag
	============================================================ */			
	$scope.deleteTag = function(tag) {
		//Level 1 - Request #1
	    bookmarkService.deleteTag(tag)                                    
	        //Response Handler #1
	        .then(function(tags) {
	            $scope.tags = tags; 
	        })        
	        .catch(reportProblems); //same as: promise.then(null, errorCallback)
	};


	/* ========================================================== 
	DELETE tag from Bookmarks
	============================================================ */			
	$scope.deleteTagFromBookmark = function(bookmarkId, tag) {
		//console.log("bookmarkId= "+bookmarkId+ " tag= "+ JSON.stringify(tag)); //TEST
		
		//Level 1 - Request
	    bookmarkService.deleteTagFromBookmark(bookmarkId, tag)                                    
	        //Response Handler
	        .then(function(bookmarks) {
	            $scope.bookmarks = bookmarks; 
	        })        
	        .catch(reportProblemsDelTagFromBk); //same as: promise.then(null, errorCallback)
	};


	/* ========================================================== 
	Clear Bookmark Form
	============================================================ */			
	$scope.clearBookmarkForm = function(input) {
		input.link = "";
		input.tags = "";
	};

	/* ========================================================== 
	Clear Tag Form
	============================================================ */	
	$scope.clearTagForm = function(input) {
		input.name = "";
		input.color = "";
	};
})


.controller('AboutCtrl', function($scope, $window, $rootScope, base64, $log) {
	$scope.message = 'Look! I am an about page.';


	//If JWT exists in session storage i.e. user logged in
	//get username from JWT
	if($window.sessionStorage.token) {

		//Request #1
		base64.getJwtProfile()  	
			//Response Handler #1
		    .then(function(profile) {
				$rootScope.welcome = 'You are Logged on as ' + JSON.stringify(profile.username) + " | ";
		    },
		 	function(error) {
		 		log.error("Error getting token" + error);
		 	});
	}
});

