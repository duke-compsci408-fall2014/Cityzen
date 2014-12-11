
//Uses Cordova Orignial Plugin: https://github.com/katzer/cordova-plugin-local-notifications
app.service('notificationService', function($cordovaLocalNotification, $timeout, $http, userService) {
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
    
  var that = this; //better way than this?
  var updateNotificationsConstantly = function() {
    getNotifications(function(response) {
      if (!that.notificationListEquality(response, userService.settings.history)){
        var newLength = response.length;
        var oldLength = userService.settings.history.length;
        console.log("newLength: " + newLength + "\noldLength: " + oldLength)

        for (var i = 0; i < response.length; i++){
          for( var j = 0; j  < userService.settings.history.length; j++){
            if(userService.settings.history[j].id== response[i].id){
              response[i].read = userService.settings.history[j].read;
            }
          }
        }
        userService.settings.history = response;
        localStorage.setItem(userService.userID, JSON.stringify(userService.settings));
        console.log("something in the notifs has changed!");
        console.log(response);
        console.log(userService.settings.history);
        if (newLength > oldLength){
          var newNotif = response[0];
          console.log("about to notify");
          that.addNotification(newNotif.title, newNotif.description);
        }
      }
      $timeout(updateNotificationsConstantly, TIMEOUT);
    });
    
  }


  this.start = function(){
    if(localStorage.getItem('userID')){  
      if (userService.settings.history.length == 0){
        console.log("length 0")
        getNotifications(function(response){
          userService.settings.history = response
          updateNotificationsConstantly();
        })
      }
      else{
        console.log(userService.settings.history.length)
        updateNotificationsConstantly();
      }
    }
  }

  /*
  * DUPLICATE CODE ^^^^^ :(
  */



  this.addNotification = function (ttle, msg) {
    if(userService.settings.notifications.areOn)
    {
      console.log("settings: " + userService.settings)
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
    }
  };

  // this.$on('onReminderClicked', function(event, id, state, json){
  //   console.log('notification clicked, id: ' + id + ' state:' + state + ' json: ' + json);
  //   addNotification('hello', 'hello');
  //   var win = window.open('google.com', '_blank');
  //   win.focus();
  // });

  // this.cancelNotification = function () {
  //   $cordovaLocalNotification.cancel('some_notification_id').then(function () {
  //     console.log('callback for cancellation background notification');
  //   });
  // };

  // this.cancelAllNotification = function () {
  //   $cordovaLocalNotification.cancelAll().then(function () {
  //     console.log('callback for canceling all background notifications');
  //   });
  // };

  // this.checkIfIsScheduled = function () {
  //   $cordovaLocalNotification.isScheduled('some_notification_id').then(function (isScheduled) {
  //     console.log(isScheduled);
  //   });
  // };

  // this.getNotificationIds = function () {
  //   $cordovaLocalNotification.getScheduledIds().then(function (scheduledIds) {
  //     console.log(scheduledIds);
  //   });
  // };

  // this.checkIfIsTriggered = function () {
  //   $cordovaLocalNotification.isTriggered('some_notification_id').then(function (isTriggered) {
  //     console.log(isTriggered);
  //   });
  // };

  // this.getTriggeredIds = function () {
  //   $cordovaLocalNotification.getTriggeredIds().then(function (triggeredIds) {
  //     console.log(triggeredIds);
  //   });
  // };

  // $scope.notificationDefaults = $cordovaLocalNotification.getDefaults();

  this.setDefaultOptions = function () {
    $cordovaLocalNotification.setDefaults({ autoCancel: true });
  };

  // event callbacks events `onadd`, `ontrigger`, `onclick` and `oncancel`
  // can be assigned like this:
  $cordovaLocalNotification.onadd = function (id, state, json) {};

});

