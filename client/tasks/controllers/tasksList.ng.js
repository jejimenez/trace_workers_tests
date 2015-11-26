angular.module("trace_workers_app").controller("TasksListCtrl", function ($scope, $meteor, $rootScope, $state, $mdDialog) {
  $scope.page = 1;
  $scope.perPage = 3;
  $scope.sort = {date: 1};
  
  $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

  //$scope.tasks = $meteor.collection(Tasks, false).subscribe('tasks');

  $scope.tasks = $meteor.collection(function() {
    return Tasks.find({}, {
      sort : $scope.getReactively('sort')
    });
  });

  if(!$rootScope.currentUser){
    $state.go('login');
  };

  $meteor.autorun($scope, function() {
    $meteor.subscribe('tasks', {
      limit: parseInt($scope.getReactively('perPage')),
      skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
      sort: $scope.getReactively('sort')
    }, $scope.getReactively('search')).then(function(){
      $scope.tasksCount = $meteor.object(Counts ,'numberOfTasks', false);

      });
    });

        $scope.map = {
          center: {
            latitude: 4.6202233,
            longitude: -74.0810389
          },
          zoom: 11
        };

  $scope.remove = function (task) {
    $scope.tasks.splice($scope.tasks.indexOf(task), 1);
  };

  $scope.removeAll = function(){
    $scope.tasks.remove();
  };

  $scope.pageChanged = function(newPage) {
    $scope.page = newPage;
  };

  $scope.getUserById = function(userId){
    return Meteor.users.findOne(userId);
  };

  $scope.creator = function(task){
    if (!task)
      return;
    var owner = $scope.getUserById(task.owner);
    if (!owner)
      return '';

    if ($rootScope.currentUser)
      if ($rootScope.currentUser._id)
        if (owner._id === $rootScope.currentUser._id)
          return 'mi';

      return owner;
    };

    $scope.openAddNewTaskModal = function(){
      $mdDialog.show({
        controller: 'AddNewTaskCtrl',
        templateUrl: 'client/tasks/views/add-new-task-modal.ng.html',
        clickOutsideToClose:true,
        resolve: {
          tasks: function () {
            return $scope.tasks;
          }
        }
      })
        .then(function(answer) {
          $scope.status = '"' + answer + '".';
        }, function() {
          $scope.status = 'Dialog cancelado.';
        });
    };

    $scope.onChangeStat = function(task){
      if(task.stat){
        task.doneAt = new Date();
        task.spentTime = Math.abs(task.doneAt-task.createdAt);
      }
      else{
        task.doneAt = '';
        task.spentTime = '';
      }
    }

});