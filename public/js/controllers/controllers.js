'use strict';

/*================================================================
Module - Controllers module
=================================================================*/
angular.module('bookmarkApp.controllers', [])

/*================================================================
Controller
=================================================================*/
.controller('BookmarkCtrl', function($scope, $http, $location, $window, $rootScope, 
	bookmarkService, AuthenticationService, $log) {

	$scope.bookmarks = {};
	$scope.tags = {};

	/* ========================================================== 
	GET bookmarks
	============================================================ */	

    /**
     * ERROR REPORTING
     *
     * called by catch() if error (promise rejections or exceptions) occur
     */
    var reportProblems = function(fault)
    {
        $log.error( "OOH No!!: " + String(fault));
        $location.url('/login');
      	//Erase JWT token
      	delete $window.sessionStorage.token;
      	AuthenticationService.isLogged = false;    // Logged Out
    };


    var reportProblemsDelTagFromBk = function(fault)
    {
        $log.error( "OOH No!!: " + String(fault));
    };





    //Level 1
    bookmarkService
		//Request #1
	    .getBookmarks()                                    
	    //Response Handler #1
	    .then(function(bookmarks) {
	        $scope.bookmarks = bookmarks; 
	        
	        //Level 2
	        return bookmarkService
				//Request #2
	        	.getUserFromToken()  

	        		// Response Handler #2
	                .then(function(profile)
	                {
	                    $scope.error = JSON.stringify(profile.error);
	        			$rootScope.welcome = JSON.stringify(profile.message);   
	                });
	    })        
	    .catch(reportProblems); //same as: promise.then(null, errorCallback)
		



	/* ========================================================== 
	GET tags
	============================================================ */	
    //Level 1
    bookmarkService
    	//Request #1
        .getTags()                                    
        //Response Handler #1
        .then(function(tags) {
            $scope.tags = tags; 
            
            //Level 2
            return bookmarkService
    			//Request #2
            	.getUserFromToken()  
            		// Response Handler #2
                    .then(function(profile)
                    {
                        $scope.error = JSON.stringify(profile.error);
	        			$rootScope.welcome = JSON.stringify(profile.message);   
                    });
        })        
        .catch(reportProblems); //same as: promise.then(null, errorCallback)



	/* ========================================================== 
	Add bookmark - bookmark.tags, bookmark.link
	============================================================ */			
	$scope.addBookmark = function(bookmark) {

		//Level 1
	    bookmarkService
	    	//Request #1
	        .addBookmark(bookmark)                                    
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

			//Level 1
		    bookmarkService
		    	//Request #1
		        .deleteBookmark(bookmark)                                    
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
			//Level 1
		    bookmarkService
		    	//Request #1
		        .addTag(tag)                                    
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
			//Level 1
		    bookmarkService
		    	//Request #1
		        .deleteTag(tag)                                    
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
			//Level 1
		    bookmarkService
		    	//Request #1
		        .deleteTagFromBookmark(bookmarkId, tag)                                    
		        //Response Handler #1
		        .then(function(bookmarks) {
		            $scope.bookmarks = bookmarks; 
		        })        
		        .catch(reportProblemsDelTagFromBk); //same as: promise.then(null, errorCallback)
		};







		// $scope.deleteTagFromBookmark = function(bookmarkId, tag) {

		// 	//console.log("bookmarkId= "+ bookmarkId );				//TEST
		// 	//console.log("tag= "+ JSON.stringify(tag) );			//TEST

		// 	$http.put('/tagFromBookmark/' + bookmarkId, tag)

		// 		//success - callback
		// 		.success(function(data, status, headers, config) {
		// 			$scope.bookmarks = data;
		// 			console.info("Successful PUT - data: " + data);
		// 		})

		// 		//error - callback
		// 		.error(function(data, status, headers, config) {
		// 			console.info("Error with PUT" + data);
		// 		});
		// };

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




.controller('AboutCtrl', function($scope, $window, $rootScope) {
		$scope.message = 'Look! I am an about page.';

		//If JWT exists in session storage i.e. user logged in
		//get username from JWT
		if($window.sessionStorage.token) {
	        var encodedProfile =$window.sessionStorage.token.split('.')[1];
	        var profile = JSON.parse(url_base64_decode(encodedProfile));
	        //console.log("***profile = " + JSON.stringify(profile));            //TEST

	        $rootScope.welcome = 'Welcome ' + JSON.stringify(profile.username);  
	    } 

});

