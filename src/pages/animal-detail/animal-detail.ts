import {Component} from '@angular/core';
import {AlertController, ModalController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {PhotoModalPage} from '../photo-modal/photo-modal';
import {AnimalProvider} from '../../providers/animal/animal';
import {Api} from '../../providers/api/api';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateProvider} from '../../providers/date/date';
import _ from 'lodash';
import * as firebase from "firebase/app";
import {DotsMenuPage} from "../dots-menu/dots-menu";

@Component({
  selector: 'animal-detail',
  templateUrl: 'animal-detail.html'
})
export class AnimalDetailPage {
  form: FormGroup;
  profileForm: FormGroup;
  adultFemales: any;
  existingDoc: any;
  isNew: boolean;

  constructor(public modalCtrl: ModalController,
              public navParams: NavParams,
              public navCtrl: NavController,
              public animalProvider: AnimalProvider,
              private api: Api,
              public popoverCtrl: PopoverController,
              public fb: FormBuilder,
              public alertCtrl: AlertController) {

    let defaultValues = {
      name: 'DE'
    };
    this.existingDoc = navParams.get('item') || defaultValues;

    this.isNew = (!this.existingDoc.id);
    this.form = new FormGroup({
      name: new FormControl({value: this.existingDoc.name, disabled: false}, [Validators.required]),
      gender: new FormControl({value: this.existingDoc.gender, disabled: !this.isNew}, [Validators.required]),
      dateOfBirth: new FormControl({value: DateProvider.getIsoStringFromDate(this.existingDoc.dateOfBirth), disabled: !this.isNew}, [Validators.required]),
      race: new FormControl({value: this.existingDoc.race, disabled: !this.isNew}, [Validators.required]),
      mother: new FormControl({value: this.existingDoc.mother, disabled: false}),
      childrenCount: new FormControl({value: this.existingDoc.childrenCount, disabled: false})
    });
  }

  ionViewDidLoad(){
    let filter = [
      {fieldPath: 'gender', opStr: '==', value: 'female'},
      {fieldPath: 'dateOfBirth', opStr: '<=', value: DateProvider.monthsAgo(AnimalProvider.femaleAdulthoodThreshhold).toDate()}
    ];
    this.api.query('animals', filter, 'dateOfBirth', 'desc').then(data => {
          this.adultFemales = data;
        }
    );
  }


  changeImage(){
    let modal = this.modalCtrl.create(PhotoModalPage);
    modal.present();
  }


  save(){
    let _this = this;
    if(_this.form.status == 'INVALID'){
      let alert = this.alertCtrl.create({
        title: 'Formular nicht vollständig',
        subTitle: 'Bitte überprüfen Sie die Pflichtangaben (markiert mit *)',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    if(this.isNew){
      _this.showFirstTimeSaveDialog().then(() => {
        _this.persistFormDate();
      });
    }else{
      _this.persistFormDate();
    }

  }

  private persistFormDate(){
    let _this = this;
    let formValues = _this.form.getRawValue();
    formValues = _.pickBy(formValues, _.identity);  //remove all undefined values
    formValues.dateCreated = new Date();

    this.api.post('animals', formValues, this.existingDoc.id).then(function(){
      _this.navCtrl.pop();
    });
  }

  private showFirstTimeSaveDialog(){
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
    let popover = this.popoverCtrl.create(DotsMenuPage, ['save', 'edit', 'event', 'notification']);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(this.doAnimalAction);
  }

  doAnimalAction(item){
    console.log('ITEM', item);
  };
}
