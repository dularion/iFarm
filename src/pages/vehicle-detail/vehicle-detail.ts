import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Api} from '../../providers/api/api';
import {TranslateService} from "@ngx-translate/core";
import {DotsMenuPage} from "../dots-menu/dots-menu";
import {EventPage} from "../event/event";
import {DotsMenuProvider} from "../../providers/dots-menu/dots-menu";
import {EntityEventsPage} from "../event/entity-events/entity-events";
import {NotificationsPage} from "../notifications/notifications";
import {AnimalProvider} from "../../providers/animal/animal";


@Component({
  selector: 'page-vehicle-detail',
  templateUrl: 'vehicle-detail.html',
})
export class VehicleDetailPage {
  form: FormGroup;
  existingDoc: any;
  table = 'vehicles';
  entityPageParams;
  entityPage;
  isNew;
  menu;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder,
              private dotsMenuProvider: DotsMenuProvider,
              private translate: TranslateService,
              public popoverCtrl: PopoverController,
              public alertCtrl: AlertController,
              private api: Api) {

    this.existingDoc = navParams.get('item') || {};
    this.isNew = !this.existingDoc.id;

    this.entityPage = EntityEventsPage;
    this.entityPageParams = {entity: this.existingDoc, button: 'VEHICLE'};

    this.form = this.createForm();
    this.initDotsMenuItems();
  }

  ionViewDidLoad() {
    console.log('VehicleDetailPage',this.existingDoc);
  }

  createForm(){
    return this.fb.group({
      licencePlate: [this.existingDoc.licencePlate, Validators.required],
      lastCheckup: this.existingDoc.lastCheckup
    });
  }

  save(){
    let _this = this;
    let title, msg;
    this.translate.get('AREAS.POPUP').subscribe((resp)=>{
      title = resp.TITLE;
      msg = resp.MSG;
    });
    if(_this.form.status == 'INVALID'){
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: msg,
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    this.api.post(this.table, this.form.getRawValue(), this.existingDoc.id).then(function(){
      _this.navCtrl.pop();
    });
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(DotsMenuPage, this.menu);
    popover.onDidDismiss((item) => {
      if (item.name == this.dotsMenuProvider.DELETE_RECORD) {
        this.deleteRecord();
      }
      if (item.name == this.dotsMenuProvider.CREATE_NEW_NOTIFICATION) {
        this.createNotification();
      }
      if (item.name == this.dotsMenuProvider.SAVE && !this.isNew) {
        this.updateRecord();
      }
      if (item.name == this.dotsMenuProvider.SAVE && this.isNew) {
        this.save();
      }
      if (item.name == this.dotsMenuProvider.CREATE_NEW_EVENT && !this.isNew) {
        this.navCtrl.push(EventPage, {table: this.table, entry: this.existingDoc});
      }
    });
    popover.present({
      ev: myEvent
    });
  }

  createNotification(){
    this.navCtrl.push(NotificationsPage,{table: this.table, entry: this.existingDoc});
  }

  updateRecord() {
    let area = this.form.getRawValue();
    area.id = this.existingDoc.id;
    this.api.update(this.table, area).then((resp) => {
      this.navCtrl.pop();
    });
  }

  deleteRecord() {
    this.api.delete(this.table, this.existingDoc).then((resp) => {
      this.navCtrl.pop();
    });
  }

  initDotsMenuItems() {
    this.menu = [
      this.dotsMenuProvider.SAVE,
      this.dotsMenuProvider.CREATE_NEW_EVENT,
      this.dotsMenuProvider.CREATE_NEW_NOTIFICATION,
      this.dotsMenuProvider.DELETE_RECORD,
    ];
  }

}
