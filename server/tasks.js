Meteor.publish("tasks", function (options, searchString) {
  if (searchString == null)
    searchString = '';

  Counts.publish(this, 'numberOfTasks', Tasks.find({
    'client' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
    $or:[
      {$and:[
        {'public': true},
        {'public': {$exists: true}}
      ]},
      {$and:[
        {owner: this.userId},
        {owner: {$exists: true}}
      ]},
      {$and:[
        {invited: this.userId},
        {invited: {$exists: true}}
      ]}
    ]}), { noReady: true });

  return Tasks.find({
    'client' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
    $or:[
      {$and:[
        {owner: this.userId},
        {owner: {$exists: true}}
      ]},
      {$and:[
        {assigned_to: this.userId},
        {assigned_to: {$exists: true}}
      ]}
    ]}, options);
});