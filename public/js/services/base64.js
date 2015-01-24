/* =============================================================

To Decode JWT

Ref. 
https://github.com/davidchambers/Base64.js
//this is used to parse the profile contained in the JWT
============================================================== */

'use strict';
/*================================================================
Module - for base64 Service
=================================================================*/
angular.module('bookmarkApp.base64Service', [])

	.factory('base64', function () {
    	return {
        	encode: function (input) {
                var output = "";
                return output;
            },

            //Decodes JWT
            decode: function (encodedJWT) {
				var output = encodedJWT.replace('-', '+').replace('_', '/');
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
            }
        };
    });
