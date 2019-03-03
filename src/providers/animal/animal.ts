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
  static femaleAdulthoodThreshhold: Number = 15;  //months
  static maleAdulthoodThreshhold: Number = 6;     //months

  static GENDER_FEMALE: String = 'female';
  static GENDER_MALE: String = 'male';

  constructor(public http: HttpClient) {
    console.log('Hello AnimalProvider Provider');
  }


  /**
   * checks for adulthood based on gender: for females, it is 15 months, and for males it is 6 months.
   * @param item
   */
  isAdult(item) {
    if(item.gender == AnimalProvider.GENDER_FEMALE){
      let femaleAdulthoodDate = DateProvider.monthsAgo(AnimalProvider.femaleAdulthoodThreshhold);
      return moment(item.dateOfBirth).isBefore(femaleAdulthoodDate);
    }
    if(item.gender == AnimalProvider.GENDER_MALE){
      let maleAdulthoodDate = DateProvider.monthsAgo(AnimalProvider.maleAdulthoodThreshhold);
      return moment(item.dateOfBirth).isBefore(maleAdulthoodDate);
    }
  }

  getTypeForImage(item) {
    if(!this.isAdult(item)){
      return 'baby';
    }

    return item.gender;
  }

}
