import { Injectable } from '@angular/core';
import {Api} from "../api/api";

@Injectable()
export class UsersProvider {

  userTable = 'users';
  constructor(private api: Api) {
    console.log('Hello UsersProvider Provider');
  }


  getMyFamilyUsers() {
    return [];
  }

  saveNewUser(email){
    return this.api.post(this.userTable, {email:email, dateCreated: new Date()});
  }
}
