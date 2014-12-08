Cityzen App
======

#### Purpose

Cityzen provides a service which connects City Councils to the voice of the people by delivering polls regarding currents issues
and returning feedback to the city.
The Cityzen mobile app serves to connect users to Cityzen’s web service via native notifications to a mobile device.
The app serves as an interface between the mobile user and the web service;
it’s value lies in the ability to actively engage users within a more personalized polling system
(receipt of polls and updates are based on the user’s GPS location [or preset zip code] and user’s interest preferences).
This takes the burden of continued engagement off the user by placing the active responsibility of user-service interaction on the service itself.

#### Technologies Used

- [Ionic](http://ionicframework.com/)
- [PhoneGap(Cordova)](http://phonegap.com/)
  - [jQuery](http://jquery.com/) 


#### Build

Download Apache Ant and add its root directory to the PATH env variable (you will only need to do this once)

Once you have the Ionic-CLI installed (requires Cordova) you can create and build an app with the following commands (in the Terminal on OSX or GitBash via Windows/OSX).

```
$ cd Cityzen

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


Plugins: 
  ```
    cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git
    cordova plugin add https://github.com/EddyVerbruggen/LaunchMyApp-PhoneGap-Plugin.git --variable URL_SCHEME=cityzen
    cordova plugin add https://github.com/katzer/cordova-plugin-local-notifications.git && cordova prepare
  ```


The following must be added to the AndroidManifest.xml file so that our callback scheme works
 ```  
<intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:host="cityzen319295.ionicframework.com" android:path="/cityzen" android:scheme="http" />
            </intent-filter>
  ```