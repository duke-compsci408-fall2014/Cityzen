Cityzen App (Pretotyppe Stage)
======

#### Technologies Used

- [Ionic](http://ionicframework.com/)
- [PhoneGap(Cordova)](http://phonegap.com/)
  - [jQuery](http://jquery.com/) 
- [Genymotion](http://www.genymotion.com/)



#### Build

Once you have the Ionic-CLI installed (requires Cordova) you can create and build an app with the following commands (in the Terminal on OSX).

```
$ ionic start myApp tabs

$ cd myApp

$ ionic platform add android

$ ionic build
```

Then,

Install and run Genymotion. Cordova seens all Genymotion devices as real devices, not as emulations (because it runs on VirtualBox). So to simulate your build app write 

```
ionic run android
```

From the app directory with the android virtual machine running.
