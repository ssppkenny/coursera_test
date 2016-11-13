(function() {
  'use strict';

  angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController);
  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope){

    $scope.checkList = function() {
      if ( $scope.mylist != undefined && new String($scope.mylist).trim() != "" ) {
        var items = $scope.mylist.split(",");
        if (items.length<=3) {
          $scope.myoutput = "Enjoy!";
        } else {
          $scope.myoutput = "Too much!";
        }
      } else {
        $scope.myoutput = "Please enter data first";
      }
    };
  }

})();
