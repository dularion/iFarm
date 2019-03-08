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

  constructor(public modalCtrl: ModalController,
              public navParams: NavParams,
              public navCtrl: NavController,
              public dotsMenuProvider: DotsMenuProvider,
              public animalProvider: AnimalProvider,
              private api: Api,
              public popoverCtrl: PopoverController,
              public fb: FormBuilder,
              public alertCtrl: AlertController) {

    let defaultValues = {
      name: 'DE'
    };
    this.existingDoc = navParams.get('item') || defaultValues;
    this.isNew = !this.existingDoc.id;

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
    this.api.query('animals', filter, 'dateOfBirth', 'desc').then(data => {
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
    if (_this.form.status == 'INVALID') {
      let alert = this.alertCtrl.create({
        title: 'Formular nicht vollständig',
        subTitle: 'Bitte überprüfen Sie die Pflichtangaben (markiert mit *)',
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

    this.api.post('animals', formValues, this.existingDoc.id).then(function () {
      _this.navCtrl.pop();
    });
  }

  private showFirstTimeSaveDialog() {
    let promise = new Promise((resolve, reject) => {
      const confirm = this.alertCtrl.create({
        title: 'Sind Sie Sicher?',
        message: 'Nach der Erstellung, sind einige Werte nicht mehr änderbar, wie Geschlecht, die Rasse und das Geburtsdatum.',
        buttons: [
          {
            text: 'Abbrechen',
            handler: () => {
              reject();
            }
          },
          {
            text: 'Fortfahren',
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
      if (item.name == this.dotsMenuProvider.SAVE && !this.isNew) {
        this.updateRecord();
      }
    });
    popover.present({
      ev: myEvent
    });
  }


  updateRecord() {
    this.api.update('animals', this.form.value).then((resp)=>{
      this.navCtrl.pop();
    });
  }

  deleteRecord() {
    this.api.delete('animals', this.existingDoc).then((resp)=>{
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
