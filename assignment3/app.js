(function() {
  'use strict';
  angular.module('NarrowItDownApp', []).controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService).directive('foundItems', FoundItemsDirective);

  // .directive('foundItems', FoundItems)

  NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];

  function NarrowItDownController($scope, MenuSearchService) {
    var list = this;
    list.removeItem = function(index) {
      list.found.splice(index,1);
    }

    list.inputtext = "";
    list.getMatchedMenuItems = function(searchTerm) {

      var promise = MenuSearchService.getMatchedMenuItems(list.inputtext);
      promise.then(function(response) {
        list.found = response;
      });

    }
  }


  MenuSearchService.inject = ['$scope', '$http', '$q'];

  function MenuSearchService($http, $q) {
     var service = this;

     service.getMatchedMenuItems = function(searchTerm) {
       if ( searchTerm.length > 0 ) {
         var promise = $http({
           method: 'GET',
           url: 'http://davids-restaurant.herokuapp.com/menu_items.json'
         });
         var found = [];
         return promise.then(function(response) {
           var data = response.data;
           var menu_items = data.menu_items;

           found = menu_items.filter(function( item ) {
             return item.description.indexOf(searchTerm) > -1;
           });
           return found;
         });
       } else {
         var deferred = $q.defer();
         deferred.resolve([]);
         return deferred.promise;
       }
     }
  }


    function FoundItemsDirective() {
      var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
          items: '<',
          onRemove : '&'
        },
        controller: FoundItemsController,
        controllerAs : 'list',
        bindToController: true
      };
      return ddo;
    }

    function FoundItemsController() {
      var list = this;
    }



})();
