import { Injectable } from '@angular/core';
import {Api} from "../api/api";
import * as firebase from 'firebase';
import {NotificationProvider} from "../notification/notification";

@Injectable()
export class UsersProvider {

  userTable = 'users';
  authUser; //from firestore authentication
  currentUser; // from users table
  teamUsers;
  constructor(private api: Api,
              private notificationProvider: NotificationProvider) {
  }


  getMyFamilyUsers() {
    if(this.teamUsers){
      console.log("WE HAVE TEAMS");
      return this.teamUsers;
    }
  }

  getCurrentUserFromUsers(){
    if(this.currentUser){
      console.log("WE HAVE USER");
      return this.currentUser;
    }
  }

  setupCurrentUser(){
    this.authUser = firebase.auth().currentUser;
    this.api.query(this.userTable,[{fieldPath: 'email', opStr: '==', value: this.authUser.email}]).then((resp) => {
      this.currentUser = resp[0];
      if(this.currentUser && this.currentUser.teamId){
        this.api.query(this.userTable,[{fieldPath: 'teamId', opStr: '==', value: this.currentUser.teamId}]).then((users)=>{
          this.teamUsers = users;
          this.setupNotifications();
        });
      }
    });
  }

  saveNewUser(email){
    return this.api.post(this.userTable, {email:email, dateCreated: new Date()});
  }

  setupNotifications() {
    this.notificationProvider.setupNotificationsForUser(this.currentUser);
  }
}
