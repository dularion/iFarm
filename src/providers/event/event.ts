import { Injectable } from '@angular/core';
import {Api} from "../api/api";


@Injectable()
export class EventProvider {
  static EVENT_TABLE_NAME: string = 'events';

  constructor(public api: Api) {  }

  save(table, item){
    return this.api.post(table, item);
  }

  getAllRecords(type:string = ''){
    if (!type){
       return this.api.query(EventProvider.EVENT_TABLE_NAME, [], 'eventDate', 'desc');
    } else {
      return this.api.query(EventProvider.EVENT_TABLE_NAME,
        [{fieldPath: 'table', opStr: '==', value: type}], 'eventDate', 'desc');
    }
  }

  updateEvent(table, item){
    return this.api.update(table, item);
  }

  deleteEvent(table, item){
    return this.api.delete(table, item);
  }

  getEventsByEntity(id){
    return this.api.query(EventProvider.EVENT_TABLE_NAME,
      [{fieldPath: 'entryId', opStr: '==', value: id}], 'eventDate', 'desc');
  }
}
