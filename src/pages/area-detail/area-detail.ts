import {Component} from '@angular/core';
import {AlertController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Api} from '../../providers/api/api';
import {DotsMenuPage} from "../dots-menu/dots-menu";
import {EventPage} from "../event/event";
import {AnimalProvider} from "../../providers/animal/animal";
import {DotsMenuProvider} from "../../providers/dots-menu/dots-menu";
import {EntityEventsPage} from "../event/entity-events/entity-events";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'area-detail',
  templateUrl: 'area-detail.html'
})
export class AreaDetailPage {
  form: FormGroup;
  existingDoc: any;
  menu;
  isNew;
  entityPageParams;
  entityPage;

  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              private dotsMenuProvider: DotsMenuProvider,
              public fb: FormBuilder,
              private translate: TranslateService,
              public popoverCtrl: PopoverController,
              public alertCtrl: AlertController,
              private api: Api) {
    this.existingDoc = navParams.get('item') || {};
    this.isNew = !this.existingDoc.id;

    this.entityPage = EntityEventsPage;
    this.entityPageParams = {entity: this.existingDoc, button: 'AREA'};

    this.form = this.createForm();
    this.initDotsMenuItems();
  }

  createForm(){
    return this.fb.group({
      name: [this.existingDoc.name, Validators.required],
      nr: [this.existingDoc.nr, Validators.required],
      type: [this.existingDoc.type, Validators.required],
      size: this.existingDoc.size,
      nextCrop: this.existingDoc.nextCrop
    })
  }

  save() {
    let _this = this;
    let title, msg;
    this.translate.get('AREAS.POPUP').subscribe((resp)=>{
      title = resp.TITLE;
      msg = resp.MSG;
    });
    if (_this.form.status == 'INVALID') {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: msg,
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    this.api.post('areas', this.form.getRawValue(), this.existingDoc.id).then(function () {
      _this.navCtrl.pop();
    });
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(DotsMenuPage, this.menu);
    popover.onDidDismiss((item) => {
      if (item.name == this.dotsMenuProvider.DELETE_RECORD) {
        this.deleteRecord();
      }
      if (item.name == this.dotsMenuProvider.SAVE && !this.isNew) {
        this.updateRecord();
      }
      if (item.name == this.dotsMenuProvider.SAVE && this.isNew) {
        this.save();
      }
      if (item.name == this.dotsMenuProvider.CREATE_NEW_EVENT && !this.isNew) {
        this.navCtrl.push(EventPage, {table: AnimalProvider.ANIMAL_TABLE_NAME, entry: this.existingDoc});
      }
    });
    popover.present({
      ev: myEvent
    });
  }


  updateRecord() {
    let animal = this.form.getRawValue();
    animal.dateOfBirth = new Date(animal.dateOfBirth);
    this.api.update(AnimalProvider.ANIMAL_TABLE_NAME, animal).then((resp) => {
      this.navCtrl.pop();
    });
  }

  deleteRecord() {
    this.api.delete(AnimalProvider.ANIMAL_TABLE_NAME, this.existingDoc).then((resp) => {
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
