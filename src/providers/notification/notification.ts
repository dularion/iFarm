import { Injectable } from '@angular/core';
import {Api} from "../api/api";
import * as firebase from 'firebase/app';


@Injectable()
export class NotificationProvider {

  notificationTable = 'notifications';
  db;

  constructor(private api:Api) {
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
    // return this.api.query(this.notificationTable,
    //     //   [{fieldPath: 'usersToNotify', opStr: 'array-contains', value: user.id}], 'date', 'desc');
  }

}
