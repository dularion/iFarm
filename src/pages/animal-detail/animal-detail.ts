import {Component} from '@angular/core';
import {AlertController, ModalController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {PhotoModalPage} from '../photo-modal/photo-modal';
import {AnimalProvider} from '../../providers/animal/animal';
import {Api} from '../../providers/api/api';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateProvider} from '../../providers/date/date';
import _ from 'lodash';
import {DotsMenuPage} from "../dots-menu/dots-menu";
import {DotsMenuProvider} from "../../providers/dots-menu/dots-menu";
import {EventPage} from "../event/event";
import {EntityEventsPage} from "../event/entity-events/entity-events";
import {TranslateService} from "@ngx-translate/core";
import {NotificationsPage} from "../notifications/notifications";

@Component({
  selector: 'animal-detail',
  templateUrl: 'animal-detail.html'
})
export class AnimalDetailPage {
  form: FormGroup;
  adultFemales: any;
  existingDoc: any;
  isNew: boolean;
  menu;
  entityPageParams;
  entityPage;

  constructor(public modalCtrl: ModalController,
              public navParams: NavParams,
              public navCtrl: NavController,
              public dotsMenuProvider: DotsMenuProvider,
              public animalProvider: AnimalProvider,
              private api: Api,
              private translate: TranslateService,
              public popoverCtrl: PopoverController,
              public fb: FormBuilder,
              public alertCtrl: AlertController) {

    let defaultValues = {
      name: 'DE'
    };
    this.existingDoc = navParams.get('item') || defaultValues;
    this.isNew = !this.existingDoc.id;
    this.entityPage = EntityEventsPage;
    this.entityPageParams = {entity: this.existingDoc, button: 'ANIMAL'};

    this.form = this.createForm();
    this.initDotsMenuItems();
  }

  ionViewDidLoad() {
    let filter = [
      {fieldPath: 'gender', opStr: '==', value: 'female'},
      {
        fieldPath: 'dateOfBirth',
        opStr: '<=',
        value: DateProvider.monthsAgo(AnimalProvider.femaleAdulthoodThreshhold).toDate()
      }
    ];
    this.api.query(AnimalProvider.ANIMAL_TABLE_NAME, filter, 'dateOfBirth', 'desc').then(data => {
        this.adultFemales = data;
      }
    );
  }

  createForm() {
    return this.fb.group({
      name: new FormControl(this.existingDoc.name || 'DE', [Validators.required]),
      gender: new FormControl({value: this.existingDoc.gender || 'female', disabled: false}, [Validators.required]),
      dateOfBirth: new FormControl(DateProvider.getIsoStringFromDate(this.existingDoc.dateOfBirth), [Validators.required]),
      race: new FormControl(this.existingDoc.race || '', [Validators.required]),
      mother: new FormControl(this.existingDoc.mother || ''),
      childrenCount: new FormControl(this.existingDoc.childrenCount || 0),
      id: new FormControl(this.existingDoc.id || null)
    });
  }

  changeImage() {
    let modal = this.modalCtrl.create(PhotoModalPage);
    modal.present();
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

    if (this.isNew) {
      _this.showFirstTimeSaveDialog().then(() => {
        _this.persistFormDate();
      });
    } else {
      _this.persistFormDate();
    }

  }

  private persistFormDate() {
    let _this = this;
    let formValues = _this.form.getRawValue();
    formValues = _.pickBy(formValues, _.identity);  //remove all undefined values
    formValues.dateCreated = new Date();

    this.api.post(AnimalProvider.ANIMAL_TABLE_NAME, formValues, this.existingDoc.id).then(function () {
      _this.navCtrl.pop();
    });
  }

  private showFirstTimeSaveDialog() {
    let promise = new Promise((resolve, reject) => {
      let title, msg, rej, res;
      this.translate.get('ANIMALS.POPUP').subscribe((resp)=>{
        title = resp.TITLE;
        msg = resp.MSG;
        rej = resp.REJECT;
        res = resp.RESOLVE;
      });
      const confirm = this.alertCtrl.create({
        title: title,
        message: msg,
        buttons: [
          {
            text: rej,
            handler: () => {
              reject();
            }
          },
          {
            text: res,
            handler: () => {
              resolve();
            }
          }
        ]
      });
      confirm.present();
    });

    return promise;
  }

  getTypeForImage() {
    return this.animalProvider.getTypeForImage(this.form.getRawValue());
  }

  isAdult() {
    return this.animalProvider.isAdult(this.form.getRawValue());
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
        this.navCtrl.push(EventPage,{table: AnimalProvider.ANIMAL_TABLE_NAME, entry: this.existingDoc});
      }
    });
    popover.present({
      ev: myEvent
    });
  }

  createNotification(){
    this.navCtrl.push(NotificationsPage,{table: AnimalProvider.ANIMAL_TABLE_NAME, entry: this.existingDoc});
  }

  updateRecord() {
    let animal = this.form.getRawValue();
    animal.dateOfBirth = new Date(animal.dateOfBirth);
    this.api.update(AnimalProvider.ANIMAL_TABLE_NAME, animal).then((resp)=>{
      this.navCtrl.pop();
    });
  }

  deleteRecord() {
    this.api.delete(AnimalProvider.ANIMAL_TABLE_NAME, this.existingDoc).then((resp)=>{
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
