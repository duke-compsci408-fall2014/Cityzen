console.log('hello');
//Uses Cordova Orignial Plugin: https://github.com/katzer/cordova-plugin-local-notifications

app.controller('NotificationCtrl', function($scope, $cordovaLocalNotification) {

  $scope.addNotification = function (ttle, msg) {
    console.log('hello');
    console.log($cordovaLocalNotification);
    $cordovaLocalNotification.add({
      id: 'some_notification_id',
      title: ttle,
      message: msg,
      autoCancel: true,
      json: '{"url": "http://cityzenapp.us/core/poll/study2.php"}'
      // parameter documentation:
      // https://github.com/katzer/cordova-plugin-local-notifications#further-informations-1
    }).then(function () {
      console.log('callback for adding background notification');
    });
  };

  $scope.cancelNotification = function () {
    $cordovaLocalNotification.cancel('some_notification_id').then(function () {
      console.log('callback for cancellation background notification');
    });
  };

  $scope.cancelAllNotification = function () {
    $cordovaLocalNotification.cancelAll().then(function () {
      console.log('callback for canceling all background notifications');
    });
  };

  $scope.checkIfIsScheduled = function () {
    $cordovaLocalNotification.isScheduled('some_notification_id').then(function (isScheduled) {
      console.log(isScheduled);
    });
  };

  $scope.getNotificationIds = function () {
    $cordovaLocalNotification.getScheduledIds().then(function (scheduledIds) {
      console.log(scheduledIds);
    });
  };

  $scope.checkIfIsTriggered = function () {
    $cordovaLocalNotification.isTriggered('some_notification_id').then(function (isTriggered) {
      console.log(isTriggered);
    });
  };

  $scope.getTriggeredIds = function () {
    $cordovaLocalNotification.getTriggeredIds().then(function (triggeredIds) {
      console.log(triggeredIds);
    });
  };

  // $scope.notificationDefaults = $cordovaLocalNotification.getDefaults();

  $scope.setDefaultOptions = function () {
    $cordovaLocalNotification.setDefaults({ autoCancel: true });
  };

  // event callbacks events `onadd`, `ontrigger`, `onclick` and `oncancel`
  // can be assigned like this:
  $cordovaLocalNotification.onadd = function (id, state, json) {};

});

