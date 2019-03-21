import { Injectable } from '@angular/core';
import {Api} from "../api/api";
import * as firebase from 'firebase/app';
import {LocalNotifications} from "@ionic-native/local-notifications/ngx";
import {ToastController} from "ionic-angular";


@Injectable()
export class NotificationProvider {

  notificationTable = 'notifications';
  db;

  constructor(private api:Api,
              private localNotifications: LocalNotifications,
              private toastCtrl: ToastController) {
    console.log('Hello NotificationProvider Provider');
    this.db = firebase.firestore();

  }

  saveNotification(record){
    return this.api.post(this.notificationTable, record);
  }

  getUsersNotifications(user){
    let col = this.db.collection(this.notificationTable);
    let query = col.where('usersToNotify', 'array-contains', user.id);
    return query.get();
  }

  setupNotificationsForUser(user){
    console.log('start look for notifications');
    let notifArr = [];
    this.presentToast()
    this.getUsersNotifications(user).then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        let data = doc.data();
        console.log(doc.id, " => ", data);
        notifArr.push({
          id: doc.id,
          title: data.title,
          text: data.description,
          trigger: {at: new Date(new Date(data.date).getTime())},
          sound: true ? 'file://sound.mp3': 'file://beep.caf'
        });
      });
    });
    console.log('notifArr', notifArr);
    this.localNotifications.schedule(notifArr);
    console.log('all seems fine');

  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'GO for notification',
      duration: 2000,
      position: 'top'
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }

}
