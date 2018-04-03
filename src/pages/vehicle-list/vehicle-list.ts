import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {VehicleDetailPage} from '../vehicle-detail/vehicle-detail';
import * as firebase from "firebase";
import {Api} from '../../providers/api/api';


/**
 * Generated class for the VehicleListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vehicle-list',
  templateUrl: 'vehicle-list.html',
})
export class VehicleListPage {
  selectedItem: any;
  items: any = [];
  type: string;

  constructor(public navCtrl: NavController, private http: HttpClient, private api: Api) {
    this.type = '';
  }

  ionViewDidLoad(){
    this.http.get('assets/vehicles.json').subscribe(data => this.items = data);
    this.api.query('vehicles').then((result) => {
     console.log(result);
    });


    // db.collection("cities").where("capital", "==", true)
    //   .get()
    //   .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //       // doc.data() is never undefined for query doc snapshots
    //       console.log(doc.id, " => ", doc.data());
    //     });
    //   })
    //   .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    //   });
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(VehicleDetailPage, {
      item: item
    });
  }

  addNewItem() {
    this.navCtrl.push(VehicleDetailPage, {
      isNew: true
    });
  }
}
