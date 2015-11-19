Tasks = new Mongo.Collection("tasks");

Tasks.allow({
  insert: function (userId, task) {
    return userId && task.owner === userId;
  },
  update: function (userId, task, fields, modifier) {
    return userId && (task.owner === userId || task.assigned_to == userId);
  },
  remove: function (userId, task) {
    return userId && task.owner === userId;
  }
});

Meteor.users.allow({
  update: function (userId, docs, fields, modifier) {
    return true;
  }
});
