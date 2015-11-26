angular.module("trace_workers_app").controller("AddNewTaskCtrl", ['$scope', '$meteor', '$rootScope', '$state', '$mdDialog', 'tasks',
  function ($scope, $meteor, $rootScope, $state, $mdDialog, tasks) {
    $scope.newTask = {/*
      client: '',
      address: '',
      description: '',
      date:'',
      location:{
        latitud:'',
        longitud:''
      }*/
    };
    $scope.added;

    $scope.addNewTask = function () {
      $scope.added = 0;
      if($scope.newTask){
        if(!$scope.newTask.client || !$scope.newTask.address || !$scope.newTask.description || !$scope.newTask.date){
          toastr.error('Digite todos los campos porfavor');
          return
        }
        if( Object.prototype.toString.call($scope.newTask.date) !== '[object Date]'){
          toastr.error('La fecha no tiene un formato váldo. Porfavor seleccione la fecha.');
          return
        }
        if($scope.newTask.client){
          $scope.newTask.owner = $rootScope.currentUser._id;
          $scope.newTask.createdAt = new Date();
          $scope.added = tasks.push($scope.newTask);
          $scope.newTask = '';
          $mdDialog.hide();
        }
      }
    }
    $scope.close = function () {
      $mdDialog.hide();
    }
    $scope.getCollection = function () {
      $scope.tasks = $meteor.collection(Tasks).subscribe('tasks');
        return $scope.tasks;
    }

  }]);