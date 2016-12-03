(function() {
  'use strict';

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['MyInfoService'];

  function MyInfoController(MyInfoService) {
    var myinfoCtrl = this;

    myinfoCtrl.getInfo = function() {
      return MyInfoService.getInfo();
    };

    myinfoCtrl.getProperties = function() {
      var info = myinfoCtrl.getInfo();
      if (info != null) {
        var props = Object.keys(myinfoCtrl.getInfo());

        return props.filter(function(item) {
          return item != "menu_item";
        });
      }
      return [];

    };

    myinfoCtrl.getMenuItemDescription = function() {
      var info = myinfoCtrl.getInfo();
      return info.menu_item.description;
    }

    myinfoCtrl.getMenuItemName = function() {
      var info = myinfoCtrl.getInfo();
      return info.menu_item.name;
    }

    myinfoCtrl.getMenuItemImage = function() {
      var info = myinfoCtrl.getInfo();
      return info.menu_item.image;
    }


    myinfoCtrl.getProperty = function(name) {
      var info = myinfoCtrl.getInfo();
      if ( name in info ) {
        return info[name];
      } else {
        return null;
      }

    }


  }

})();
