import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UsersProvider} from "../../providers/user/users";


@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  entity;

  teamUsers;
  currentUser;
  isLoading = true;

  constructor(public navCtrl: NavController,
              private usersProvider: UsersProvider,
              public navParams: NavParams) {
    this.currentUser = usersProvider.getCurrentUserFromUsers();
    this.teamUsers = usersProvider.getMyFamilyUsers();
    console.log('in notificPAGE', this.currentUser,this.teamUsers);
  }

  ionViewDidLoad() {
    console.log('NotificationsPage', this.navParams.data);
  }

}
