'use strict';

/*================================================================
Module - Controllers module
=================================================================*/
angular.module('bookmarkApp.Controllers', [])

/*================================================================
Controller
=================================================================*/
.controller('BookmarkCtrl', ['$scope', '$http', '$location', function BookmarkCtrl($scope, $http, $location) {

		$scope.bookmarks = {};
		$scope.tags = {};

		/* ========================================================== 
		GET bookmarks
		============================================================ */	
		$http.get('/bookmarks')

		//success - callback fn
		.success(function(data, status, headers, config) {
			$scope.bookmarks = data;
			//console.info("Status: " + status);					//TEST
			//console.info("Config: " + JSON.stringify(config));	//TEST
		})

		//error - callback fn
		.error(function(data, status, headers, config) {
			console.log('Error getting bookmarks: ' + data);
		});


		/* ========================================================== 
		GET tags
		============================================================ */	
		$http.get('/tags')

		//success - callback
		.success(function(data, status, headers, config) {
			$scope.tags = data;

			//console.info("in get success. data =" + JSON.stringify(data) ); 	//TEST
			//console.info("Status: " + status);								//TEST
			//console.info("Config: " + JSON.stringify(config));				//TEST

			//Build an array containing the available tag names
			var tagNames = [];
			$scope.tags.forEach(function(tag) {
				tagNames.push(tag.name);
			});
			//console.info("tagNames= " + tagNames);		//TEST
		})

		//error - callback fn
		.error(function(data, status, headers, config) {
			console.log('Error getting Tags: ' + data);
		});


		/* ========================================================== 
		Add bookmark - bookmark.tags, bookmark.link
		============================================================ */			
		$scope.addBookmark = function(bookmark) 
		{
			//console.info("bookmark>>= "+ JSON.stringify(bookmark) ); //TEST
			$http.post('/bookmarks', $scope.bookmark)

			//success - callback
			.success(function(data, status, headers, config) {
				$scope.bookmarks = data;
				console.info("In POST Success bookmark added-data= " + JSON.stringify(data));
			})

			//error - callback
			.error(function(data) {
				console.info("Error Posting Bookmark" + data);
			})
		};
		
		/* ========================================================== 
		DELETE bookmark
		============================================================ */			
		$scope.deleteBookmark = function(bookmark) {

			//console.log("bookmark._id: " + bookmark._id);	//TEST

			$http.delete('/bookmarks/' + bookmark._id)

				//success
				.success(function(data, status, headers, config) {
					$scope.bookmarks = data;
					console.info("Status: " + status);
					console.info("Config: " + JSON.stringify(config));
				})

				//error
				.error(function(data) {
					console.log('Error deleting: ' + data);
				});
		};


		/* ========================================================== 
		ADD tag - tag.name,	tag.color
		============================================================ */		
		$scope.addTag = function(tag) 
		{
			$http.post('/tags', $scope.tag)

			//success - callback
			.success(function(data, status, headers, config) {
				$scope.tags = data;
				console.info("Tag added data: " + data);
			})

			//error - callback
			.error(function(data) {
				console.info("Error Posting Tag" + data);
			})

		};


		/* ========================================================== 
		DELETE tag
		============================================================ */			
		$scope.deleteTag = function(tag) {

			$http.delete('/tags/' + tag._id )

			//success - callback
			.success(function(data, status, headers, config) {
				$scope.tags = data;
				console.info("Tag Deleted - data: " + data);
			})

			//error - callback
			.error(function(data) {
				console.info("Error Deleting Tag" + data);
			});

		};



		$scope.deleteTagFromBookmark = function(bookmarkId, tag) {

			//console.log("bookmarkId= "+ bookmarkId );				//TEST
			//console.log("tag= "+ JSON.stringify(tag) );			//TEST

			$http.put('/tagFromBookmark/' + bookmarkId, tag)

				//success - callback
				.success(function(data, status, headers, config) {
					$scope.bookmarks = data;
					console.info("Successful PUT - data: " + data);
				})

				//error - callback
				.error(function(data) {
					console.info("Error with PUT" + data);
				});

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
		}
	}
])

.controller('AboutCtrl', function($scope) {
		$scope.message = 'Look! I am an about page.';
});
