/*================================================
Ref.
http://stackoverflow.com/questions/24357445/chain-promises-with-angularjs
================================================ */

'use strict';
/*================================================
Module - for the Services
================================================ */

angular.module('bookmarkApp.ajaxServices', [])

.service('bookmarkService', function($http, $q, $window, base64) {

    return {

      getBookmarks : function() {
        var deferred = $q.defer();
        $http.get('/bookmarks')

          .success(function(bookmarks) {
            deferred.resolve(bookmarks);
          })
          .error(function(reason) {
            return deferred.reject ("OOPS Unable to Get Bookmarks!!!" + reason);//TEST
          });

          return deferred.promise; //returns the promise
      },


      addBookmark : function(bookmark) {
        var deferred = $q.defer();

        $http.post('/bookmarks', bookmark)
          .success(function(bookmarks) {     
            deferred.resolve(bookmarks);
          })
          .error(function(reason) {
            deferred.reject("OOPS Unable to Add Bookmark!!!" + reason);//TEST
          });

          //return $q.reject ("Promise Rejected - Unable to Get Tags!!!");//TEST
          return deferred.promise; //returns the promise
      },


      deleteBookmark : function(bookmark) {
        var deferred = $q.defer();

        $http.delete('/bookmarks/' + bookmark._id)
          .success(function(bookmarks) {     
            deferred.resolve(bookmarks);
          })
          .error(function(reason) {
            deferred.reject("OOPS Unable to Delete Bookmark!!! " + reason);//TEST
          });

          //return $q.reject ("Promise Rejected - Unable to Get Tags!!!");//TEST
          return deferred.promise; //returns the promise
      },


      getUserFromToken : function() {      
        
        var deferred = $q.defer();
        
        //return $q.reject ("Promise Rejected - Unable to Get profile from JWT!!!");//TEST                
        var encodedProfile = $window.sessionStorage.token.split('.')[1]; //From JWT
        var decodedProfile = JSON.parse(base64.decode(encodedProfile));
        
        return $q.resolve ({
          user: decodedProfile.username //Extract username from JWT profile 
        });

        return deferred.promise; //returns the promise
      },


      getTags : function() {
        var deferred = $q.defer();
        $http.get('/tags')
          .success(function(tags) {     
            deferred.resolve(tags);
          })
          .error(function(reason) {
            deferred.reject("OOPS Unable to Get Tags!!!" + reason);//TEST
          });

          //return $q.reject ("Promise Rejected - Unable to Get Tags!!!");//TEST
          return deferred.promise; //returns the promise
      },


      addTag : function(tag) {
        var deferred = $q.defer();

        $http.post('/tags', tag)
          .success(function(tags) {     
            deferred.resolve(tags);
          })
          .error(function(reason) {
            deferred.reject("OOPS Unable to Add Tag!!!" + reason);//TEST
          });

          //return $q.reject ("Promise Rejected - Unable to Get Tags!!!");//TEST
          return deferred.promise; //returns the promise
      },


      deleteTag : function(tag) {
        var deferred = $q.defer();

        $http.delete('/tags/' + tag._id)
          .success(function(tags) {     
            deferred.resolve(tags);
          })
          .error(function(reason) {
            deferred.reject("OOPS Unable to Delete Tag!!! " + reason);//TEST
          });

          //return $q.reject ("Promise Rejected - Unable to Get Tags!!!");//TEST
          return deferred.promise; //returns the promise
      },

      /**
       * This Route Functionality Not Completed Yet 
       */
      deleteTagFromBookmark : function(bookmarkId, tag) {
        var deferred = $q.defer();

/*
        $http.put('/tagFromBookmark/' + bookmarkId, tag)
          .success(function(bookmarks) {     
            deferred.resolve(bookmarks);
          })
          .error(function(reason) {
            deferred.reject("Sorry - Functionality Not Added Yet!!! " + reason);//TEST
          });
*/
          deferred.reject("Sorry - Functionality Not Added Yet!!! ");//TEST

          //return $q.reject ("Promise Rejected - Unable to Get Tags!!!");//TEST
          return deferred.promise; //returns the promise
      }


    };
});
