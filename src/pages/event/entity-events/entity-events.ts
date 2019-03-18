import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EventProvider} from "../../../providers/event/event";
import {EventPage} from "../event";

@Component({
  selector: 'page-entity-events',
  templateUrl: 'entity-events.html',
})
export class EntityEventsPage {

  entity;
  events = [];
  isLoading = true;
  buttonLabel = "";

  constructor(public navCtrl: NavController,
              private eventProvider: EventProvider,
              public navParams: NavParams) {
    this.entity = navParams.data.entity;
    this.buttonLabel = navParams.data.button;
    this.loadEvents();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntityEventsPage', this.navParams.data);
  }

  loadEvents(){
    this.eventProvider.getEventsByEntity(this.entity.id).then((resp)=>{
      this.events = resp;
      this.isLoading = false;
    })
  }

  addEvent(){
    this.navCtrl.push(EventPage, {table: this.buttonLabel.toLowerCase() + 's', entry: this.entity});
  }

  goToEventDetail(item) {
    this.navCtrl.push(EventPage, {table: item.table, entry: item})
  }
}
