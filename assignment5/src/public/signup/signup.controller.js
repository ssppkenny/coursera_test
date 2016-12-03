(function() {
  'use strict';

  angular.module('public')
  .controller('SignupController', SignupController);

  SignupController.$inject = ['MenuService', 'MyInfoService'];

  function SignupController(MenuService, MyInfoService) {
    var signupCtrl = this;
    signupCtrl.firstname="";
    signupCtrl.lastname="";
    signupCtrl.email="";
    signupCtrl.phonenumber="";
    signupCtrl.menunumber="";
    signupCtrl.error = 0;
    signupCtrl.requestProcessed = false;


    signupCtrl.go = function() {
      var promise = MenuService.findMenuItem(signupCtrl.menunumber);
      promise.then(function(response) {
        var data = response.data;
        var menu_item = {};
        menu_item.name = data.name;
        menu_item.description = data.description;
        menu_item.image = "images/menu/" + data.category_short_name + "/" + data.category_short_name + ".jpg" ;
        var info = {};
        info.firstname =  signupCtrl.firstname;
        info.lastname =  signupCtrl.lastname;
        info.phonenumber = signupCtrl.phonenumber;
        info.email = signupCtrl.email;
        info.menu_item = menu_item;

        MyInfoService.saveInfo(info);
        signupCtrl.error = 0;
        signupCtrl.requestProcessed = true;
      }, function(reason) {
        signupCtrl.error = reason.status;
      } );

    }


  }
})();
