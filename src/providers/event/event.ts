import { Injectable } from '@angular/core';
import {Api} from "../api/api";
import {DateProvider} from "../date/date";

/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {
  static EVENT_TABLE_NAME: string = 'events';

  constructor(public api: Api) {  }

  save(table, item){
    return this.api.post(table, item);
  }

  getAllRecords(type:string = ''){
    if (!type){
       return this.api.query(EventProvider.EVENT_TABLE_NAME);
    } else {
      this.api.query(EventProvider.EVENT_TABLE_NAME,
        [{fieldPath: 'table', opStr: '==', value: type}], 'dateCreated', 'desc');
    }
  }
}
