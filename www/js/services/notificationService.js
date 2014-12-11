
//Uses Cordova Orignial Plugin: https://github.com/katzer/cordova-plugin-local-notifications
app.service('notificationService', function($cordovaLocalNotification, $timeout, $http, userService) {
  console.log('hello');
  /*
  * Poll database for new notifs. 
  */
  var URL = "http://www.cityzenapp.us/core/";
  var TIMEOUT = 15000;

  var that = this; //store instance to reference within getNotifications callback function called in this.updateNotificationsConstantly

  /*
  * returns true if given notification lists are same length
  */
  this.notificationListEquality = function(before, after) {
    return before.length == after.length;
  }

  /*
  * returns list of all notifications from the Cityzen database
  */
  var getNotifications = function(callback){
    var phpFile = "listnotifications.php";
    //calls back to updateNotificationsConstantly
    return $http.get(URL+phpFile+"?callback=?").
      success(function(data) {
        data = data.substr(1);
        callback(JSON.parse(data));
      }).
      error(function(data) {
        console.log("Unable to load notifcations");
      });
  }

  /*
  * Checks the database for notifications using TIMEOUT as an interval
  * If new notifications are found, attempts to send the user a local notification and updates user's stored notification list, user.settings.history
  */
  var updateNotificationsConstantly = function() {
    //get full list of notification
    getNotifications(function(response) {
      //if database has changed since last poll
      if (!that.notificationListEquality(response, userService.settings.history)){
        var newLength = response.length;
        var oldLength = userService.settings.history.length;

        //for every read notification in local notifcation list, mark the corresponding notifcation in the new list as read
        for (var i = 0; i < response.length; i++){
          for( var j = 0; j  < userService.settings.history.length; j++){
            if(userService.settings.history[j].id== response[i].id){
              response[i].read = userService.settings.history[j].read;
            }
          }
        }
        //update notification list in mobile app and localStorage
        userService.settings.history = response;
        localStorage.setItem(userService.userID, JSON.stringify(userService.settings));

        //if a new notfication has been added
        if (newLength > oldLength){
          //get most recent notification
          var newNotif = response[0];
          //attemot to send device a local notification
          that.addNotification(newNotif.title, newNotif.description);
        }
      }
      $timeout(updateNotificationsConstantly, TIMEOUT);
    });
    
  }

  /*
  * initialize notifications
  * begin constant polling for new notifications
  */
  this.start = function(){
    //ensure user is logged in
    if(localStorage.getItem('userID')){  
      //if user has no previously loaded notifications, load all recent notifications without sending local notifications
      if (userService.settings.history.length == 0){
        getNotifications(function(response){
          userService.settings.history = response; //load all notifications
          updateNotificationsConstantly(); //begin constant database polling once all existing notifs are loaded
        })
      }
      else{
        //begin constant database polling immediately
        updateNotificationsConstantly();
      }
    }
  }

  /*
  * send the device a local notifcation if user has notifications enabled
  */
  this.addNotification = function (ttle, msg) {
    //check that user has enabled notification
    if(userService.settings.notifications.areOn)
    {
      //add notification
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
        //do nothing
      });
    }
  };

  /*
  * use cordova default notification settings
  */
  this.setDefaultOptions = function () {
    $cordovaLocalNotification.setDefaults({ autoCancel: true });
  };

  // event callbacks events `onadd`, `ontrigger`, `onclick` and `oncancel`
  // can be assigned like this:
  $cordovaLocalNotification.onadd = function (id, state, json) {};

});

