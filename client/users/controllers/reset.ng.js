angular.module("trace_workers_app").controller("ResetCtrl", ['$meteor', '$state',
  function ($meteor, $state) {
    var vm = this;

    vm.credentials = {
      email: ''
    };

    vm.error = '';

    vm.reset = function () {
      $meteor.forgotPassword(vm.credentials).then(
        function () {
          vm.sent = true;
          toastr.error('Se ha enviado el correo para reestablecer la contraseña');
          $state.go('tasks');
        },
        function (err) {
          vm.error = 'Error enviando el correo - ' + err;
          toastr.error(vm.error);
        }
      );
    };
  }
]);