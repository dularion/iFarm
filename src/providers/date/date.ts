import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';

/*
  Generated class for the DateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DateProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DateProvider Provider');
  }

  public static getIsoStringFromDate(date): string {
    return date ? date.toISOString() : '';
  }

  public static isKeyValuePairDate(key, value): boolean {
    return (key.indexOf('date') > -1 && moment(value).isValid());
  }

  public static convertDateTimeToDate(value:string): Date {
    return moment(value).subtract(12, 'h').toDate();
  }

  public static twentyMonthsAgo(): moment.Moment {
    return moment().add(-20, 'M');
  }

}
