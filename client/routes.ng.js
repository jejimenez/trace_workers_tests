angular.module("trace_workers_app").run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    if (error === 'AUTH_REQUIRED') {
      $state.go('tasks');
    };
    
  });
});

angular.module("trace_workers_app").config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('tasks', {
      url: '/tasks',
      templateUrl: 'client/tasks/views/tasks-list.ng.html',
      controller: 'TasksListCtrl'
    })
    .state('taskDetails', {
      url: '/tasks/:taskId',
      templateUrl: 'client/tasks/views/task-details.ng.html',
      controller: 'TaskDetailsCtrl',
      resolve: {
        "currentUser": function($meteor){
          return $meteor.requireUser();
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'client/users/views/login.ng.html',
      controller: 'LoginCtrl',
      controllerAs: 'lc'
    })
    .state('register',{
      url: '/register',
      templateUrl: 'client/users/views/register.ng.html',
      controller: 'RegisterCtrl',
      controllerAs: 'rc'
    })
    .state('resetpw', {
      url: '/resetpw',
      templateUrl: 'client/users/views/reset-password.ng.html',
      controller: 'ResetCtrl',
      controllerAs: 'rpc'
    })
    .state('users', {
      url: '/users',
      templateUrl: 'client/users/views/users.ng.html',
      controller: 'UsersCtrl',
      controllerAs: 'usr'
    })
    .state('reports', {
      url: '/reports',
      templateUrl: 'client/reports/views/reports.ng.html',
      controller: 'ReportsCtrl',
      controllerAs: 'rep'
    })
    .state('logout', {
      url: '/logout',
      resolve: {
        "logout": function($meteor, $state) {
          return $meteor.logout().then(function(){
            $state.go('login');
          }, function(err){
            console.log('logout error - ', err);
          });
        }
      }
    });

  //$urlRouterProvider.otherwise("login");
});