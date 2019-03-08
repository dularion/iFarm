import {Injectable} from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class DotsMenuProvider {


  // constants for menu items
  public SAVE = 'DOTS_MENU.SAVE_RECORD';
  public EDIT = 'DOTS_MENU.EDIT_RECORD';
  public CREATE_NEW = 'DOTS_MENU.CREATE_NEW';
  public CREATE_NEW_EVENT = 'DOTS_MENU.CREATE_NEW_EVENT';
  public CREATE_NEW_NOTIFICATION = 'DOTS_MENU.CREATE_NEW_NOTIFICATION';
  public DELETE_RECORD = 'DOTS_MENU.DELETE_RECORD';

  private menuObjects = {};


  constructor() {
    this.setupMenuItems();
  }

  public getMenuItems() {
    return this.menuObjects;
  }

  setupCurrentMenu(items) {
    let menu = [];
    _.forEach(items, (i) => {
       menu.push(this.menuObjects[i]);
    });
    return menu;
  }


  private setupMenuItems() {
    this.menuObjects[this.SAVE] = {
      icon: 'cloud-upload',
      name: this.SAVE
    };
    this.menuObjects[this.EDIT] = {
      icon: 'create',
      name: this.EDIT
    };
    this.menuObjects[this.CREATE_NEW] = {
      icon: 'add',
      name: this.CREATE_NEW
    };
    this.menuObjects[this.CREATE_NEW_EVENT] = {
      icon: 'aperture',
      name: this.CREATE_NEW_EVENT
    };
    this.menuObjects[this.CREATE_NEW_NOTIFICATION] = {
      icon: 'notifications',
      name: this.CREATE_NEW_NOTIFICATION
    };
    this.menuObjects[this.DELETE_RECORD] = {
      icon: 'trash',
      name: this.DELETE_RECORD
    };
  }


}
