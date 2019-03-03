import {Component} from '@angular/core';
import {AlertController, ModalController, NavController, NavParams} from 'ionic-angular';
import {PhotoModalPage} from '../photo-modal/photo-modal';
import {AnimalProvider} from '../../providers/animal/animal';
import {Api} from '../../providers/api/api';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateProvider} from '../../providers/date/date';
import _ from 'lodash';

@Component({
  selector: 'animal-detail',
  templateUrl: 'animal-detail.html'
})
export class AnimalDetailPage {
  form: FormGroup;
  profileForm: FormGroup;
  animals: any;
  existingDoc: any;
  isNew: boolean;

  constructor(public modalCtrl: ModalController, public navParams: NavParams,
              public navCtrl: NavController, public animalProvider: AnimalProvider, private api: Api,
              public fb: FormBuilder, public alertCtrl: AlertController) {

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
    this.api.query('animals', [{fieldPath: 'gender', opStr: '==', value: 'female'}]).then(data => {
          this.animals = data;
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
    let formValues = this.form.getRawValue();
    formValues = _.pickBy(formValues, _.identity);  //remove all undefined values

    this.api.post('animals', formValues, this.existingDoc.id).then(function(){
      _this.navCtrl.pop();
    });
  }

  getTypeForImage() {
    return this.animalProvider.getTypeForImage(this.form.getRawValue());
  }

  isAdult() {
    return this.animalProvider.isAdult(this.form.getRawValue());
  }
}
