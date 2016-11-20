(function(){
  'use strict';

  angular.module('ShoppingListCheckOff', []).controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController).service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];

  function ToBuyController($scope,ShoppingListCheckOffService ){
       var ctrl = this;
       ctrl.items = ShoppingListCheckOffService.items;

       ctrl.buyItem = function(index) {
         ctrl.items[index].bought = true;
       }

       ctrl.everythingBought = function () {
         var bought = ctrl.items.filter(function(item) {
           return item.bought;
         }).length;

         return bought == ctrl.items.length;
       };
  }

  function AlreadyBoughtController($scope,ShoppingListCheckOffService) {
    var ctrl = this;
    ctrl.items = ShoppingListCheckOffService.items;

    ctrl.nothingBought = function () {
      var notbought = ctrl.items.filter(function(item) {
        return !item.bought;
      }).length;
      
      return notbought == ctrl.items.length;
    };

  }

  function ShoppingListCheckOffService() {
    var service = this;

    service.items = [{name:"Item1", quantity:1, bought:false},
          {name:"Item2", quantity:2,bought:false},
          {name:"Item3", quantity:3,bought:false},
          {name:"Item4", quantity:4,bought:false},
          {name:"Item5", quantity:5,bought:false}
  ];
  }

})();
