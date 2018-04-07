import {Component} from '@angular/core';
import {AlertController, ModalController, NavController, NavParams} from 'ionic-angular';
import {PhotoModalPage} from '../photo-modal/photo-modal';
import {HttpClient} from '@angular/common/http';
import {AnimalProvider} from '../../providers/animal/animal';
import {Api} from '../../providers/api/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateProvider} from '../../providers/date/date';

@Component({
  selector: 'animal-detail',
  templateUrl: 'animal-detail.html'
})
export class AnimalDetailPage {
  form: FormGroup;
  animals: any;
  existingDoc: any;

  constructor(public modalCtrl: ModalController, public navParams: NavParams, private http: HttpClient,
              public navCtrl: NavController, public animalProvider: AnimalProvider, private api: Api,
              public fb: FormBuilder, public alertCtrl: AlertController) {
    this.existingDoc = navParams.get('item') || {};

    this.form = fb.group({
      name: [this.existingDoc.name, Validators.required],
      gender: [this.existingDoc.gender, Validators.required],
      dateOfBirth: [DateProvider.getIsoStringFromDate(this.existingDoc.dateOfBirth), Validators.required],
      type: this.existingDoc.type,
      race: this.existingDoc.race,
      mother: this.existingDoc.mother,
      childrenCount: this.existingDoc.childrenCount,
    });
  }

  ionViewDidLoad(){
    this.http.get('assets/animals.json').subscribe(data => this.animals = data);
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
    this.api.post('animals', this.form.getRawValue(), this.existingDoc.id).then(function(){
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
