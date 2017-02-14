(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('TodoFactory', TodoFactory);

    TodoFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    //run all the functions in this factory
    function TodoFactory($http, $q) {
        var service = {
            getItems: getItems,
            //adding to backend database
            postItems: postItems,
            putItems: putItems,
            deleteItems: deleteItems
        };
        return service;

        //////////////// the findLocation needs to be the same as params, it's a placeholder

        function getItems() {
            var defer = $q.defer();

            $http({
                method: 'GET',

                url: "http://localhost:54444/api/Todoes"

            })

            .then(function(response) {
                    if (typeof response.data === "object") {
                        defer.resolve(response);
                    } else {
                        defer.reject(response);
                    }
                },

                function(error) {
                    console.log(error + "The database did not load.");
                    defer.reject(error);

                });
            return defer.promise;
        }





        function postItems(todo) {
            var defer = $q.defer();

            $http({
                    method: 'POST',
                    url: "http://localhost:54444/api/Todoes",
                    //header copied from Postman
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    data: todo

                })

                .then(function(response) {
                        if (typeof response.data === "object") {
                            defer.resolve(response);
                        } else {
                            defer.reject(response);
                        }
                    },

                    function(error) {
                        console.log(error + "There was no contact with the database.");
                        defer.reject(error);

                    });
            return defer.promise;
        }




         function putItems(id, todo) {
            var defer = $q.defer();

            console.log(todo);

            $http({
                    method: 'PUT',
                    url: "http://localhost:54444/api/Todoes" + '/' + id,
                    data: todo
                    // config: 

                })

                .then(function(response) {

                        if (typeof response.data === "object") {
                            defer.resolve(response);
                            console.log(response + "Success, the item is updated.");
                        } else {
                            defer.reject(response);
                        }
                    },

                    function(error) {
                        console.log(error + "Problem with this item, it did not update.");
                        defer.reject(error);

                    });
            return defer.promise;
        }







                 function deleteItems(id) {
            var defer = $q.defer();

            console.log(id);

            $http({
                    method: 'DELETE',
                    url: "http://localhost:54444/api/Todoes" + '/' + id
                    // data: todo

                })

                .then(function(response) {

                        if (typeof response.data === "object") {
                            defer.resolve(response);
                            console.log(response + "Success, the item is deleted.");
                        } else {
                            defer.reject(response);
                        }
                    },

                    function(error) {
                        console.log(error + "Problem with this item, it did not delete.");
                        defer.reject(error);

                    });
            return defer.promise;
        }










    }
})();