import {Component} from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
import * as firebase from 'firebase';
import {HomePage} from '../home/home';
import {TranslateService} from '@ngx-translate/core';
import {User} from '../../providers/providers';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersProvider} from "../../providers/user/users";

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
  isLoginFormVisible = true;
  loginForm;
  registerForm;
  minPswLength = 6;
  errorCode;
  errorMessage;
  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
              public user: User,
              private usersProvider: UsersProvider,
              private fb: FormBuilder,
              public toastCtrl: ToastController,
              public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });

    this.loginForm = this.createLoginForm();
  }

  createLoginForm() {
    return this.fb.group({
      email: new FormControl(this.account.email || '', [Validators.required]),
      password: new FormControl(this.account.password || '', [Validators.required, Validators.minLength(this.minPswLength)]),
    });
  }

  createRegisterForm() {
    return this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(this.minPswLength)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(this.minPswLength)]),
    }, {validator: this.checkPasswords});
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.repeatPassword.value;

    return pass === confirmPass ? null : {notSame: true}
  }

  ionViewDidLoad() {
    let vm = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('%c user', 'color: deeppink; font-weight: bold; text-shadow: 0 0 5px deeppink;', user);
        vm.navCtrl.setRoot(HomePage);
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });
  }

  doLogin() {
    this.errorCode = '';
    this.errorMessage = '';
    let user = this.loginForm.value;
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        this.navCtrl.setRoot(HomePage);
      })
      .catch((error) => {
        this.errorCode = error.code;
        this.errorMessage = error.message;
      });
  }

  registerNewUser() {
    this.errorCode = '';
    this.errorMessage = '';
    if (this.registerForm.valid) {
      let user = this.registerForm.value;
      delete user.repeatPassword;
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then((resp) => {
        this.usersProvider.saveNewUser(user.email).then((e) => {
          this.navCtrl.setRoot(HomePage);
        }).catch((err)=>{
        });
      }).catch((error) => {
        this.errorCode = error.code;
        this.errorMessage = error.message;
      });

    }
  }

  toggleLogin() {
    if (this.isLoginFormVisible && !this.registerForm) {
      this.registerForm = this.createRegisterForm();
    }
    this.isLoginFormVisible = !this.isLoginFormVisible;
  }

  isInvalidRegistrationField(field) {
    return this.registerForm.get(field).invalid && this.registerForm.get(field).touched;
  }
}
