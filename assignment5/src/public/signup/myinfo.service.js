(function() {
  'use strict';
  angular.module('public')
  .service('MyInfoService', MyInfoService);


  function MyInfoService() {
    var service = this;
    service.info = null;

    service.saveInfo = function(info) {
      service.info = info;
    };

    service.getInfo = function() {
      return service.info;
    };
  }

})();
