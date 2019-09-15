import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {EventProvider} from "../../../providers/event/event";
import {EventPage} from "../event";


@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {
  events;
  isLoading = true;
  segmentSelection = '';

  constructor(public navCtrl: NavController,
              public eventProvider: EventProvider) {
   this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventListPage');
  }


  goToEventDetail(item) {
    this.navCtrl.push(EventPage, {table: item.table, entry: item})
  }

  getTypeForImage() {
    return 'baby';
  }

  loadData() {
    this.isLoading = true;
    this.eventProvider.getAllRecords(this.segmentSelection).then((resp) => {
      this.events = resp;
      this.isLoading = false;
    });
  }
}
