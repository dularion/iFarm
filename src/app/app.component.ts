import {Component, ViewChild} from '@angular/core';
import {Config, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {PageProvider} from '../providers/page/page';
import * as firebase from "firebase";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/messaging';
import 'firebase/functions';


import {TranslateService} from '@ngx-translate/core';
import {WelcomePage} from '../pages/welcome/welcome';
import {StorageProvider} from "../providers/storage/storage";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WelcomePage;
  pages: any;

  constructor(public platform: Platform, private storageProvider: StorageProvider,
              public statusBar: StatusBar, public splashScreen: SplashScreen,
              private pageProvider: PageProvider, public translate: TranslateService, private config: Config) {

    let key = this.storageProvider.DEFAULT_LANGUAGE_KEY;
    this.storageProvider.getValueFromStorage(key).then(function (resp) {
        if (resp) {
          translate.setDefaultLang(resp);
          translate.use(resp);
          translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
           config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
          });
        } else {
          translate.setDefaultLang('de');
          translate.use('de');
          translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
            config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
          });
        }
      }
    );

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

    let firebaseConfig: any = {
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
    this.nav.setRoot(page ? page.component : HomePage);
  }

  signOut() {
    let _this = this;
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      _this.nav.setRoot(WelcomePage);
    }).catch(function (error) {
      // An error happened.
    });
  }
}
