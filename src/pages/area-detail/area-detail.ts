import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Api} from '../../providers/api/api';

@Component({
  selector: 'area-detail',
  templateUrl: 'area-detail.html'
})
export class AreaDetailPage {
  form: FormGroup;

  constructor(public navParams: NavParams, public navCtrl: NavController, public fb: FormBuilder,
              public alertCtrl: AlertController, private api: Api) {
    let existingDoc = navParams.get('item') || {};

    this.form = fb.group({
      name: [existingDoc.name, Validators.required],
      nr: [existingDoc.nr, Validators.required],
      type: [existingDoc.type, Validators.required],
      size: existingDoc.size,
      nextCrop: existingDoc.nextCrop
    });
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
    this.api.post('areas', this.form.getRawValue()).then(function(){
      _this.navCtrl.pop();
    });
  }
}
