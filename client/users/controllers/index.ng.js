angular.module("trace_workers_app").controller("indexController", ['$scope', '$meteor', '$rootScope',
  function ($scope, $meteor, $rootScope) {
    $scope.stat = null;

    onLoadStat();

    function onLoadStat(){
      if($rootScope.currentUser){
        $scope.user_stat = $rootScope.currentUser.profile.stat;
      }
    };

    $scope.onChangeStat = function(){
      $rootScope.currentUser.profile.stat = $scope.user_stat;
      Meteor.users.update({_id:$rootScope.currentUser._id}, {$set:{"profile.stat":$scope.user_stat}});
    }

  }]);