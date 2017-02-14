(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('MainController', MainController);

    MainController.$inject = ['TodoFactory','toastr'];

    /* @ngInject */
    //newTodo function is called immediately to get an update from database and load items.
    function MainController(TodoFactory,toastr) {
        var vm = this;
        vm.title = 'MainController';
        newTodo();


//I found this code block, got it to work by adding a parseInt, -forcing a number value found in the
// option tag.  the getTrColor function is called in the ng-style directive on the view.
    vm.getTrColor = function (colorIndex) {
        
      switch(parseInt(colorIndex)){
        case 1: return '#ff4d4d';
        case 2: return '#80ccff';
        case 3: return '#b3ffb3';
        default: return 'white';
      };

    };
//sortType is an empty array so it can have different properties called. 
    vm.sortType = '';



        //////////////// Gets data from database.  NewTodo function is called on page load

          function newTodo() {
            TodoFactory.getItems().then(
                function(response) {
                    vm.addList = response.data;
                    console.log(vm.addList);

                    toastr.success('Take a look at all your items todo.');

                },

                function(error) {
                    if (error.data) {
                        toastr.error('there was an error' + error.data);

                    } else {
                        toastr.info('no data');
                    }
                }
            )
            vm.todoItem ='';
        };





        vm.itemsToDatabase = function() {
            TodoFactory.postItems(
            {  //from POST in factory, pushes todos to database
                //parameters from the database : name in html
                addTask: vm.name, 
                selectedPriority: vm.priority,
                createDate: new Date()
            }
                ).then(
                function(response) {
                    
                    // vm.addList = response;
                    // console.log(vm.addList);
                    newTodo();

                    toastr.success('Todo item has moved to the database.');

                },

                function(error) {
                    if (error.data) {
                        toastr.error('there was an error' + error.data);

                    } else {
                        toastr.info('no data');
                    }
                }
            )
            vm.todoItem ='';
        };






  vm.UpdateData = function (ida, todos) {
    TodoFactory.putItems(ida, todos)
        .then(
                function(response) {
                    newTodo();
                    
                    console.log(response);

                    toastr.success('Todo item has moved to the database.');

                },

                function(error) {
                    if (error.data) {
                        toastr.error('there was an error' + error.data);

                    } else {
                        // toastr.info('no data');
                    }
                }
            )    
            
        }



       vm.deleteTask = function(removeItem) {
            TodoFactory.deleteItems(removeItem).then(function(response) {
                //when item is deleted the main function refreshes to return what is in the database
                newTodo();

                console.log(response);

            }, function(error) {
                alert(error)

            });
        }



}
})();