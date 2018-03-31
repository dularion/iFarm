import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import * as firebase from 'firebase';
import {HomePage} from '../home/home';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    let _this = this;
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('%c user', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', user);
      _this.navCtrl.setRoot(HomePage);

      // User is signed in.
    } else {
      // No user is signed in.
    }
  });
  }


  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
