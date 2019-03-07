import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import {DateProvider} from '../date/date';
import {FirebaseFilter} from '../../types/firebase-filter';
import * as firebase from 'firebase/app';
import OrderByDirection = firebase.firestore.OrderByDirection;
import {AnimalProvider} from "../animal/animal";



/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'https://example.com/api/v1';
  db;

  constructor(public http: HttpClient) {
    this.db = firebase.firestore();
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }


  query(collection: string, filters?:Array<FirebaseFilter>, orderBy?: string, orderByDirection?: OrderByDirection): Promise<Array<any>>{
    return new Promise<Array<any>>((resolve, reject) => {

      let dbRef = this.db.collection(collection);
      let query = dbRef;

      if(filters){
        filters.forEach(function (filter:FirebaseFilter) {
          if(filter.value){
            query = query.where(filter.fieldPath, filter.opStr, filter.value);
          }
        })
      }

      if(orderBy){
        query = query.orderBy(orderBy, orderByDirection)
      }

      query.get().then(function(querySnapshot) {
        let result = [];
        querySnapshot.forEach(function(doc) {
          let data = doc.data();
          data.id = doc.id;
          result.push(data);
        });

        resolve(result);
      }, reject);

    });
  }

  post(collection: string, body: any, id: string) {
    _.forEach(body, function (value, key) {
      if(DateProvider.isKeyValuePairDateString(key, value)){
        body[key] = DateProvider.convertDateTimeToDate(value);
      }
    });

    let dbRef = this.db.collection(collection);
    if(id){
      return dbRef.doc(id).set(body);
    }
    else{
      return dbRef.doc().set(body);
    }
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}
