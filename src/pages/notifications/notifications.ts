import {Component} from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import {UsersProvider} from "../../providers/user/users";
import {AbstractControl, FormBuilder, FormControl, Validators} from "@angular/forms";
import {NotificationProvider} from "../../providers/notification/notification";
import {LocalNotifications} from "@ionic-native/local-notifications/ngx";


@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  entity;

  teamUsers;
  currentUser;
  isLoading = true;
  form;
  errorMessage = '';

  constructor(public navCtrl: NavController,
              private notificationProvider: NotificationProvider,
              private toastCtrl: ToastController,
              private usersProvider: UsersProvider,
              private localNotifications: LocalNotifications,
              private fb: FormBuilder,
              public navParams: NavParams) {
    this.currentUser = usersProvider.getCurrentUserFromUsers();
    this.teamUsers = usersProvider.getMyFamilyUsers();
    this.isLoading = false;
    console.log('in notificPAGE', this.currentUser, this.teamUsers);
    this.form = this.createForm();
  }

  ionViewDidLoad() {
    this.teamUsers.forEach(e => {
      if (e.email == this.currentUser.email) {
        e.checked = true;
        e.disabled = true;
      }
    })
  }


  createForm() {
    return this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
      date: new FormControl(new Date(), [Validators.required, this.validateDate]),
      usersToNotify: new FormControl([]),
    });
  }

  validateDate(control: AbstractControl) {
    let offsetMilisec = new Date().getTimezoneOffset() * 60000;
    let timeWithOffset = new Date(control.value).getTime() + offsetMilisec;
    let now = new Date().getTime();
    if (timeWithOffset < now) {
      return {invalidDate: true};
    }
    return null;
  }

  isInvalidFormField(field) {
    return this.form.get(field).invalid && this.form.get(field).touched;
  }

  createNotification() {
    let record = this.form.value;
    this.teamUsers.forEach(u => {
        if (u.checked) {
          record.usersToNotify.push(u.id);
        }
      }
    );
    let vm = this;
    this.notificationProvider.saveNotification(record).then(function () {
      vm.presentToast();
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Notification was created successfully',
      duration: 2000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      this.navCtrl.pop();
    });

    toast.present();
  }

  sendNotification(){
    this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      trigger: {at: new Date(new Date().getTime() + 3600)},
      led: 'FF0000',
      sound: null
    });
  }
}
