(function() {
  'use strict';
  angular.module('NarrowItDownApp', []).controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService).directive('foundItems', FoundItems);

  // .directive('foundItems', FoundItems)

  NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];

  function NarrowItDownController($scope, MenuSearchService) {
    var ctrl = this;
    ctrl.inputtext = "";
    ctrl.getMatchedMenuItems = function(searchTerm) {
      var promise = MenuSearchService.getMatchedMenuItems(ctrl.inputtext);
      promise.then(function(response) {
        ctrl.found = response;
      });

    }
  }


  MenuSearchService.inject = ['$scope', '$http'];

  function MenuSearchService($http) {
     var service = this;

     service.getMatchedMenuItems = function(searchTerm) {
       var promise = $http({
         method: 'GET',
         url: 'http://davids-restaurant.herokuapp.com/menu_items.json'
       });
       var found = null;
       return promise.then(function(response) {
         var data = response.data;
         var menu_items = data.menu_items;

         found = menu_items.filter(function( item ) {
           return item.description.indexOf(searchTerm) > -1;
         });
         return found;
       });

     }
  }


    function FoundItems() {
      var ddo = {
        templateUrl: 'foundItems.html',
        restrict: 'E',
        scope: {
          list: '=myList'
        }
      };
      return ddo;
    }



})();
