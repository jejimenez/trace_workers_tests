angular.module("trace_workers_app").controller("ReportsCtrl", ['$scope', '$meteor', '$rootScope',
  function ($scope, $meteor, $rootScope) {

    allusers = $meteor.collection(Meteor.users, false).subscribe('users');

    $meteor.call('report1').then(
      function(data){
        $scope.tasksrep = data;
        $scope.labels = [];
        $scope.data = [];
        var i = 0;
        var user  = null;
        while(i<$scope.tasksrep.length){
          var ids = $scope.tasksrep[i]._id+"";
          user = Meteor.users.findOne({"_id":ids});
          $scope.labels[i] = ($scope.tasksrep[i]._id == null ? "Sin asignar" : user.emails[0].address );
          $scope.data[i] = Math.round(($scope.tasksrep[i].spentTime)/1000/60/60);
          i++;
        }
      },
      function(err){
        console.log('failed', err);
      }
    );

    $meteor.call('report2').then(
      function(data2){
        $scope.tasksrep2 = data2;
        $scope.labels2 = [];
        $scope.data2 = [];
        $scope.data2[0] = [];
        var i = 0;
        while(i<$scope.tasksrep2.length){
          $scope.labels2[i] = ($scope.tasksrep2[i]._id == null ? "Sin ubicación" : $scope.tasksrep2[i]._id );
          $scope.data2[0][i] = ($scope.tasksrep2[i].num);
          i++;
        }

      },
      function(err){
        console.log('failed', err);
      }
    );
  }]);