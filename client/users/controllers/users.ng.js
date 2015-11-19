angular.module("trace_workers_app").controller("UsersCtrl", ['$scope', '$meteor', '$rootScope',
  function ($scope, $meteor, $rootScope) {

    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

    $scope.onChangeAdmin = function(user){
      console.log(user);
      updated = Meteor.users.update({_id:user._id}, {$set:{"profile.rol": (user.profile.rol ? 'Admin' : '' )}});
      console.log(updated);
    }

  }]);