angular.module("trace_workers_app").controller("RegisterCtrl", ['$meteor', '$state', '$rootScope',
  function ($meteor, $state, $rootScope) {
    var vm = this;

    vm.credentials = {
      email: '',
      password: '',
      profile:{
        rol:''
      }
    };

    vm.error = '';

    vm.register = function () {
      vm.registered = 0;
      if(vm.credentials.email == "" || vm.credentials.password == ""){
        vm.error = "Los campos no pueden estar vacíos";
        toastr.error(vm.error);
        return;
      }
      $meteor.createUser(vm.credentials).then(
        function () {
          vm.error = 'Se ha creado el usuario exitosamente';
          toastr.success(vm.error);
          vm.credentials = {
            email: '',
            password: '',
            profile:{
              rol:''
            }
          };
          vm.registered = 1;
          $state.go('tasks');
        },
        function (err) {
          vm.error = 'Error al registrar - ' + err;
          toastr.error(vm.error);
        }
      );
    };
  }
]);