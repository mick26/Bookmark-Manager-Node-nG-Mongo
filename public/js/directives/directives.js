
/*================================================================
Module - directives module which is injected into main module
=================================================================*/
angular.module('bookmarkApp.Directives', [])


/*================================================================
Directive
Functionality: to display tags with a delete 'x' icon. 
Wire delete icon to call a given function on ng-click event

html Element: <display-tag>
with 3 attributes: <display-tag  tag="" bookmark-id="" delete-tag=""> 
=================================================================*/

.directive('displayTag', function() {

	return {
		restrict: 'E',
	    scope: {
	    	tag: '=tag',
	    	bookmarkId: "=bookmarkId",
	    	deleteTag: '&'
	    },
		template: '<span class="label" style="background-color:{{tag.color}};">{{tag.name}} <span class="glyphicon glyphicon-remove" ng-click="deleteTag(bookmarkId, tag)"></span> </span>',
	};

});
