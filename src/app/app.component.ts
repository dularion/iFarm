import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {PageProvider} from '../providers/page/page';
import * as firebase from "firebase";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private pageProvider: PageProvider) {

    this.initializeApp();

    this.pages = this.pageProvider.getPages();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    let firebaseConfig:any = {
      apiKey: "AIzaSyDeWl3mDIXyQIv9BpzcsFgujtws9fks4qY",
      authDomain: "ifarm-b1d40.firebaseapp.com",
      databaseURL: "https://ifarm-b1d40.firebaseio.com",
      projectId: "ifarm-b1d40",
      storageBucket: "",
      messagingSenderId: "230846736298"
    };
    firebase.initializeApp(firebaseConfig);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
