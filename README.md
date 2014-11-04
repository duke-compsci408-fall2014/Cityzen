Cityzen App (Pretotyppe Stage)
======

#### Technologies Used

- [Ionic](http://ionicframework.com/)
- [PhoneGap(Cordova)](http://phonegap.com/)
  - [jQuery](http://jquery.com/) 
- [Genymotion](http://www.genymotion.com/)



#### Build

Download Apache Ant and add its root directory to the PATH env variable (you will only need to do this once)

Once you have the Ionic-CLI installed (requires Cordova) you can create and build an app with the following commands (in the Terminal on OSX or GitBash via Windows/OSX).

```
$ cd myApp

$ ionic platform add android

$ ionic build android

To run on Android devices, simply plug in the device into the computer and run the following command:

$ ionic run android

```
Troubleshooting:

If you receive errors during the platform build process, be sure the following are true:

1) Add the Cordova Plug-in to the Project Directory by running the following command: "cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git" 
  (see reference: http://forum.ionicframework.com/t/unable-to-add-plugins-perhaps-your-version-of-cordova-is-too-old/3807)
2) Ensure that your JAVA_HOME variable is set to your JDK folder not JRE folder


Then,

Install and run Genymotion. Cordova seens all Genymotion devices as real devices, not as emulations (because it runs on VirtualBox). So to simulate your build app write 

```
ionic run android
```

From the app directory with the android virtual machine running.


Plugins: cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git
