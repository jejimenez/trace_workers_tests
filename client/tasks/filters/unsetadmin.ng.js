angular.module('trace_workers_app').filter('unsetadmin', function () {
  return function (users, currentUser) {
    if (!currentUser)
      return false;

    return _.filter(users, function (user) {
      if (user._id == currentUser._id)
        return false;
      else
        return true;
    });
  }
});