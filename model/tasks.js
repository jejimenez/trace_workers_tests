Tasks = new Mongo.Collection("tasks");

Tasks.allow({
  insert: function (userId, task) {
    return true;
  },
  update: function (userId, task, fields, modifier) {
    return true;
  },
  remove: function (userId, task) {
    return true;
  }
});

Meteor.users.allow({
  update: function (userId, docs, fields, modifier) {
    return true;
  }
});

Meteor.methods({
  report1: function () {
    if (Meteor.isServer) {
      var data = Tasks.aggregate([{$group: {_id: "$assigned_to", spentTime: {$sum: "$spentTime"}}}]);
      return data;
    }
  }
});
