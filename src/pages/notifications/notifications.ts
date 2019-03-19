import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UsersProvider} from "../../providers/user/users";
import {FormBuilder, FormControl} from "@angular/forms";


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
              private usersProvider: UsersProvider,
              private fb:FormBuilder,
              public navParams: NavParams) {
    this.currentUser = usersProvider.getCurrentUserFromUsers();
    this.teamUsers = usersProvider.getMyFamilyUsers();
    this.isLoading = false;
    console.log('in notificPAGE', this.currentUser,this.teamUsers);
    this.form = this.createForm();
  }

  ionViewDidLoad() {
    console.log('NotificationsPage', this.navParams.data);
  }


  createForm(){
    return this.fb.group({
      title: new FormControl('',[]),
      description: new FormControl('',[]),
      date: new FormControl(new Date(),[]),
      usersToNotify: new FormControl(),
    });
  }

  isInvalidFormField(field) {
    return this.form.get(field).invalid && this.form.get(field).touched;
  }

  createNotification(){
    console.log('createNotification', this.form.value, this.teamUsers);
  }
}
