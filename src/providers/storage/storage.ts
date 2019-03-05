import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  public DEFAULT_LANGUAGE_KEY = 'language';

  constructor(private storage: Storage) {  }

  setValueInStorage(key, value){
    this.storage.set(key, value);
  }

  getValueFromStorage(key) {
    return this.storage.get(key);
  }

}
