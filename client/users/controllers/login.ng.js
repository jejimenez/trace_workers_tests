angular.module("trace_workers_app").controller("LoginCtrl", ['$meteor', '$state', '$rootScope',
  function ($meteor, $state, $rootScope) {
    var vm = this;
    vm.error = '';
    vm.info ='';

    vm.credentials = {
      email: '',
      password: ''
    };

    if($rootScope.currentUser){
      $state.go('tasks');
    };

    vm.error = '';

    vm.login = function () {
      $meteor.loginWithPassword(vm.credentials.email, vm.credentials.password).then(
        function () {
          $state.go('tasks');
        },
        function (err) {
          vm.error = 'Login error - ' + err;
          toastr.error(vm.error);
        }
      );
    };
  }
]);