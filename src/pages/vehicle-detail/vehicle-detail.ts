import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Api} from '../../providers/api/api';

/**
 * Generated class for the VehicleDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vehicle-detail',
  templateUrl: 'vehicle-detail.html',
})
export class VehicleDetailPage {
  form: FormGroup;
  existingDoc: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder,
              public alertCtrl: AlertController, private api: Api) {

    this.existingDoc = navParams.get('item') || {};

    this.form = fb.group({
      licencePlate: [this.existingDoc.licencePlate, Validators.required],
      lastCheckup: this.existingDoc.lastCheckup
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

    this.api.post('vehicles', this.form.getRawValue(), this.existingDoc.id).then(function(){
      _this.navCtrl.pop();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehicleDetailPage');
  }

}
