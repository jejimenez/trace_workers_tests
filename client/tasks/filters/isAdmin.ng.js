angular.module('trace_workers_app').filter('isAdmin', function () {
  return function (user_rol) {
    if (!user_rol)
      return false;

    return _.filter(user_rol, function (user_rol) {
      if (user_rol == 'Admin')
        return true;
      else
        return false;
    });
  }
});