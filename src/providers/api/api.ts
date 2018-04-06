import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import * as _ from 'lodash';

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


  query(collection: string): Promise<Array<any>>{
    return new Promise<Array<any>>((resolve, reject) => {

      this.db.collection(collection).get().then(function(querySnapshot) {
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
