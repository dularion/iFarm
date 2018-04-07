import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import * as firebase from 'firebase';
import {HomePage} from '../home/home';
import {TranslateService} from '@ngx-translate/core';
import {User} from '../../providers/providers';

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
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'Test1234'
  };
  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
              public user: User,
              public toastCtrl: ToastController,
              public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  doLogin() {

    firebase.auth().signInWithEmailAndPassword(this.account.email, this.account.password)
      .then(function () {
        this.navCtrl.setRoot(HomePage);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }

  ionViewDidLoad() {
    let vm = this;
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('%c user', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', user);
      vm.navCtrl.setRoot(HomePage);
      // User is signed in.
    } else {
      // No user is signed in.
    }
  });
  }
}
