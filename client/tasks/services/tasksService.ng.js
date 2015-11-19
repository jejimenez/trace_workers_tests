angular.module("trace_workers_app").factory('tasksService', function ($meteor) {
    return {
        getCollection: function () {
            return $meteor.collection(Tasks).subscribe('tasks');
        },
        insert: function (task) {
            $meteor.call('insertTasks', task);
        },
        tasksObj: function () {
            return Tasks;
        }
    }
});
