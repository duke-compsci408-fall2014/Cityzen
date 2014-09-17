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

If you are having trouble running the add android command it could be caused by [this error](http://forum.ionicframework.com/t/unable-to-add-plugins-perhaps-your-version-of-cordova-is-too-old/3807/2)

run
```
$ cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git

```

Then,

Install and run Genymotion. Cordova seens all Genymotion devices as real devices, not as emulations (because it runs on VirtualBox). So to simulate your build app write 

```
ionic run android
```

From the app directory with the android virtual machine running.
