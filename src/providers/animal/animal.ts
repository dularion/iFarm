import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
import {DateProvider} from '../date/date';

/*
  Generated class for the AnimalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AnimalProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AnimalProvider Provider');
  }


  isAdult(item) {
    let twentyMonthsAgo = DateProvider.twentyMonthsAgo();
    return moment(item.dateOfBirth).isBefore(twentyMonthsAgo);
  }

  getTypeForImage(item) {
    if(!this.isAdult(item)){
      return 'baby';
    }

    return item.gender;
  }

}
