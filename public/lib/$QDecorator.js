/**
 * @author      Thomas Burleson
 * @date        November, 2013
 * @copyright   2013 Mindspace LLC.
 * @web         http://solutionOptimist.com
 *
 * @description
 *
 * Used within AngularJS to decorate/enhance the AngularJS `$q` service.
 *
 *
 */

(function ( window ){
    "use strict";

        /**
         * Decorate the $q service instance to add extra
         * `spread()` and `resolve()` features
         */
    var $QDecorator = function ($provide)
        {
                // Partial application to build a resolve() function

            var resolveWith = function( $q)
                {
                    return function resolved( val )
                    {
                        var dfd = $q.defer();
                        dfd.resolve( val );

                        return dfd.promise;
                    };
                };

            // Register our $log decorator with AngularJS $provider

            $provide.decorator('$q', ["$delegate",
                function ($delegate)
                {
                    if ( angular.isUndefined( $delegate.spread ))
                    {
                        // Let's add a `spread()` that is very useful
                        // when using $q.all()

                        $delegate.spread = function( targetFn,scope )
                        {
                            return function()
                            {
                                var params = [].concat(arguments[0]);
                                targetFn.apply(scope, params);
                            };
                        };
                    }

                    if ( angular.isUndefined( $delegate.resolve ))
                    {
                        // Similar to $q.reject(), let's add $q.resolve()
                        // to easily make an immediately-resolved promise
                        // ... this is useful for mock promise-returning APIs.

                        $delegate.resolve = resolveWith($delegate);
                    }

                    return $delegate;
                }
            ]);
        };


    if ( window.define != null )
    {
        window.define([ ], function ( )
        {
            return [ "$provide", $QDecorator ];
        });

    } else {

        window.$QDecorator = [ "$provide", $QDecorator ];
    }

})( window );
