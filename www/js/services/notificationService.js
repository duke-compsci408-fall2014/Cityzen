
//Uses Cordova Orignial Plugin: https://github.com/katzer/cordova-plugin-local-notifications
app.service('notificationService', function($cordovaLocalNotification, $timeout, $http) {
  console.log('hello');
  /*
  * Poll database for new notifs. 
  */
  var URL = "http://www.cityzenapp.us/core/";
  var TIMEOUT = 15000;

  this.notificationListEquality = function(before, after) {
    return before.length == after.length;
  }

  var getNotifications = function(callback){
    var phpFile = "listnotifications.php";
    return $http.get(URL+phpFile+"?callback=?").
      success(function(data) {
        data = data.substr(1);
        //console.log(data);
        //console.log(JSON.parse(data));
        callback(JSON.parse(data));
      }).
      error(function(data) {
        console.log("CANNOT GET THE NOTIFS HALP");
      });
  }
    
  this.cache = {notifications: [], calls: 0};
  var that = this; //better way that this?
  var updateNotificationsConstantly = function() {
    getNotifications(function(response) {
      if (!that.notificationListEquality(response, that.cache.notifications)){
        that.cache.notifications = response;
        if (response.length > that.cache.notifications.length){
          var newNotif = response[0];
          that.addNotification(newNotif.title, newNotif.description);
        }
      }
      that.cache.calls++;
      console.log(that.cache.calls);
      $timeout(updateNotificationsConstantly, TIMEOUT);
    });
    
  }
  updateNotificationsConstantly();

  /*
  * DUPLICATE CODE ^^^^^ :(
  */





  this.addNotification = function (ttle, msg) {
    console.log('hello');
    console.log($cordovaLocalNotification);
    $cordovaLocalNotification.add({
      id: 'some_notification_id',
      title: ttle,
      message: msg,
      autoCancel: true,
      icon :'ic_notification',
      json: '{"url": "http://cityzenapp.us/core/poll/study2.php"}'
      // parameter documentation:
      // https://github.com/katzer/cordova-plugin-local-notifications#further-informations-1
    }).then(function () {
      console.log('callback for adding background notification');
    });
  };

  // this.$on('onReminderClicked', function(event, id, state, json){
  //   console.log('notification clicked, id: ' + id + ' state:' + state + ' json: ' + json);
  //   addNotification('hello', 'hello');
  //   var win = window.open('google.com', '_blank');
  //   win.focus();
  // });

  this.cancelNotification = function () {
    $cordovaLocalNotification.cancel('some_notification_id').then(function () {
      console.log('callback for cancellation background notification');
    });
  };

  this.cancelAllNotification = function () {
    $cordovaLocalNotification.cancelAll().then(function () {
      console.log('callback for canceling all background notifications');
    });
  };

  this.checkIfIsScheduled = function () {
    $cordovaLocalNotification.isScheduled('some_notification_id').then(function (isScheduled) {
      console.log(isScheduled);
    });
  };

  this.getNotificationIds = function () {
    $cordovaLocalNotification.getScheduledIds().then(function (scheduledIds) {
      console.log(scheduledIds);
    });
  };

  this.checkIfIsTriggered = function () {
    $cordovaLocalNotification.isTriggered('some_notification_id').then(function (isTriggered) {
      console.log(isTriggered);
    });
  };

  this.getTriggeredIds = function () {
    $cordovaLocalNotification.getTriggeredIds().then(function (triggeredIds) {
      console.log(triggeredIds);
    });
  };

  // $scope.notificationDefaults = $cordovaLocalNotification.getDefaults();

  this.setDefaultOptions = function () {
    $cordovaLocalNotification.setDefaults({ autoCancel: true });
  };

  // event callbacks events `onadd`, `ontrigger`, `onclick` and `oncancel`
  // can be assigned like this:
  $cordovaLocalNotification.onadd = function (id, state, json) {};

});

