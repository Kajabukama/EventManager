import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  rootPage:any;
  zone:NgZone;

   constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

      this.zone = new NgZone({});

      platform.ready().then(() => {
         statusBar.styleDefault();
         splashScreen.hide();
      });

      firebase.initializeApp({
         apiKey: "AIzaSyD14Y327cma6GEefjCo9P6ybx4LIA2svp4",
         authDomain: "eventmanager-36269.firebaseapp.com",
         databaseURL: "https://eventmanager-36269.firebaseio.com",
         projectId: "eventmanager-36269",
         storageBucket: "eventmanager-36269.appspot.com",
         messagingSenderId: "215771061190"
      });

      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
         this.zone.run( () => {
            if (!user) {
               this.rootPage = 'login';
               unsubscribe();
            } else {
               this.rootPage = HomePage;
               unsubscribe();
            }
         });
      });
  }
}

