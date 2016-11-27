(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsListController', ItemsListController);

ItemsListController.$inject = ['MenuDataService', 'categoryitems'];
function ItemsListController(MenuDataService, categoryitems) {
    var itemsList = this;
    itemsList.items = categoryitems.data.menu_items;
}

})();
