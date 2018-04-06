import {Component} from '@angular/core';
import {AlertController, ModalController, NavController, NavParams} from 'ionic-angular';
import {PhotoModalPage} from '../photo-modal/photo-modal';
import {HttpClient} from '@angular/common/http';
import {AnimalProvider} from '../../providers/animal/animal';
import {Api} from '../../providers/api/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'animal-detail',
  templateUrl: 'animal-detail.html'
})
export class AnimalDetailPage {
  form: FormGroup;
  animals: any;

  constructor(public modalCtrl: ModalController, public navParams: NavParams, private http: HttpClient,
              public navCtrl: NavController, public animalProvider: AnimalProvider, private api: Api,
              public fb: FormBuilder, public alertCtrl: AlertController) {
    let existingDoc = navParams.get('item') || {};

    this.form = fb.group({
      name: [existingDoc.name, Validators.required],
      gender: [existingDoc.gender, Validators.required],
      dateOfBirth: [existingDoc.dateOfBirth, Validators.required],
      type: existingDoc.type,
      race: existingDoc.race,
      mother: existingDoc.mother,
      childrenCount: existingDoc.childrenCount,
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
    this.api.post('animals', this.form.getRawValue()).then(function(){
      _this.navCtrl.pop();
    });
  }

  getTypeForImage() {
    return this.animalProvider.getTypeForImage(this.form);
  }

  isAdult() {
    return this.animalProvider.isAdult(this.form);
  }
}
