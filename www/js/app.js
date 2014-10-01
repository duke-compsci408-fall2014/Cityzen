// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html) // the 2nd parameter is an array of 'requires'
var app = angular.module('cityzen', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url: "/", 
      templateUrl: "templates/login.html"
    })
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html",
    })
    .state('tabs.projects', {
      url: "/projects",
      views: {
        'projects-tab' : {
          templateUrl: "templates/projects.html",
          controller: "ProjectsCtrl"
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "templates/about.html"
        }
      }
    })
    .state('tabs.notifications', {
      url: "/notifications",
      views: {
        'notifications-tab': {
          templateUrl: "templates/notifications.html"
        }
      }
    });

   $urlRouterProvider.otherwise("/");

})


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
