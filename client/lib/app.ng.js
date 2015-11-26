angular.module('trace_workers_app',[
  'angular-meteor',
  'ui.router',
  'angularUtils.directives.dirPagination',
  'uiGmapgoogle-maps',
  'ngMaterial',
  'chart.js'
]);

var themeIcons = ['$mdIconProvider' , function ($mdIconProvider) {

  $mdIconProvider
    .iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg")
    .iconSet("action", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg")
    .iconSet("communication", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg")
    .iconSet("content", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg")
    .iconSet("toggle", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg")
    .iconSet("navigation", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg")
    .iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");

}];

angular.module('trace_workers_app')
  .config(themeIcons);

function onReady() {
  angular.bootstrap(document, ['trace_workers_app'], {
    strictDi: true
  });
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);

angular.module('trace_workers_app')
  .config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
      datasetFill: false
    });
  }]);

/*
accounts-password                     1.1.4  Password support for accounts
angular                               1.0.2* Everything you need to use AngularJS in your Meteor app
angular:angular-material              0.11.4  Google Material design written for AngularJs (official repo)
angular:angular-mocks                 1.4.7  AngularJS (official) release. For full solution: http://angular-meteor.com/
angularui:angular-google-maps         2.2.1  angular-google-maps (official)
angularui:angular-ui-router           0.2.15  angular-ui-router (official): Flexible routing with nested views in AngularJS
angularutils:pagination               0.9.1_2  Magical automatic pagination for anything in AngularJS
blaze-html-templates                  1.0.1  Compile HTML templates into reactive UI with Meteor Blaze
check                                 1.1.0  Check whether a value matches a pattern
chrismbeckett:toastr                  2.1.2_1  Gnome / Growl type non-blocking notifications
dotansimha:accounts-ui-angular        0.0.2  AngularJS wrapper for Meteor's Account-UI package
email                                 1.0.8  Send email messages
es5-shim                              4.1.14  Shims and polyfills to improve ECMAScript 5 support
jquery                                1.11.4  Manipulate the DOM using CSS selectors
less                                  2.5.1  Leaner CSS language
meteor-base                           1.0.1  Packages that every Meteor app needs
mobile-experience                     1.0.1  Packages for a great mobile user experience
mongo                                 1.1.3  Adaptor for using MongoDB and Minimongo over DDP
planettraining:material-design-icons  2.0.0  Material design icons from google
sanjo:jasmine                         0.20.2  Velocity integration of the Jasmine testing framework
session                               1.1.1  Session variable
standard-minifiers                    1.0.2  Standard minifiers used with Meteor apps by default.
tmeasday:publish-counts               0.7.2  Publish the count of a cursor, in real time
tracker                               1.0.9  Dependency tracker to allow reactive callbacks
velocity:html-reporter                0.9.1  Reactive Velocity test reports in your app.


*/