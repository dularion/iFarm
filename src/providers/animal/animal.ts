import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';

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


  getTypeForImage(item) {
    let twentyMonthsAgo = moment().add(-20, 'M');
    if(moment(item.dateOfBirth).isAfter(twentyMonthsAgo)){
      return 'baby';
    }

    return item.gender;
  }

}
