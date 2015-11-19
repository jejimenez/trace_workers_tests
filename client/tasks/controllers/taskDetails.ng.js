angular.module("trace_workers_app").controller("TaskDetailsCtrl", function ($scope, $stateParams, $meteor) {
  $scope.task = $meteor.object(Tasks, $stateParams.taskId, false);
  $scope.users = $meteor.collection(function(){return Meteor.users.find({ 'profile.rol' : { $ne : "Admin" } })} , false).subscribe('users');
  if($scope.$meteorSubscribe){$scope.$meteorSubscribe('tasks')};

  console.log($scope.task);
  $scope.save = function(){
    $scope.saved = 0;
    if($scope.task){
      if(!$scope.task.client || !$scope.task.address || !$scope.task.description || !$scope.task.date){
        toastr.error('Digite todos los campos porfavor.');
        return
      }
      if( Object.prototype.toString.call($scope.task.date) !== '[object Date]'){
        toastr.error('La fecha no tiene un formato váldo. Porfavor seleccione la fecha.');
        return
      }
      $scope.saved = $scope.task.save();
      toastr.success('Guardado.');
    }
  }

  $scope.map = {
    center: {
      latitude: 4.6202233,
      longitude: -74.0810389
    },
    zoom: 11,
    events: {
      click: function (mapModel, eventName, originalEventArgs) {
        if (!$scope.task)
          return;

        if (!$scope.task.location)
          $scope.task.location = {};

        $scope.task.location.latitude = originalEventArgs[0].latLng.lat();
        $scope.task.location.longitude = originalEventArgs[0].latLng.lng();
        //scope apply required because this event handler is outside of the angular domain
        $scope.$apply();
      }
    },
    marker: {
      options: { draggable: true },
      events: {
        dragend: function (marker, eventName, args) {
          if (!$scope.task.location)
            $scope.task.location = {};

          $scope.task.location.latitude = marker.getPosition().lat();
          $scope.task.location.longitude = marker.getPosition().lng();
        }
      }
    }
  };
});
