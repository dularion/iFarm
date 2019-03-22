import { Injectable } from '@angular/core';
import {Api} from "../api/api";
import * as firebase from 'firebase/app';


@Injectable()
export class NotificationProvider {

  notificationTable = 'notifications';
  db;

  constructor(private api:Api) {
    this.db = firebase.firestore();

  }

  saveNotification(record){
    return this.api.post(this.notificationTable, record);
  }

}
