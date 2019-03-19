import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AnimalListPage} from '../../pages/animal-list/animal-list';
import {AreaListPage} from '../../pages/area-list/area-list';
import {VehicleListPage} from '../../pages/vehicle-list/vehicle-list';
import {ListPage} from '../../pages/list/list';
import {EventListPage} from "../../pages/event/event-list/event-list";
import {NotificationsPage} from "../../pages/notifications/notifications";

/*
  Generated class for the PageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PageProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PageProvider Provider');
  }

  getPages (): Array<{component: any, icon: string, name: string}> {
    return [
      { name: 'NOTIFICATIONS', component: NotificationsPage, icon: 'ifarmicon-cow'},
      { name: 'ANIMALS', component: AnimalListPage, icon: 'ifarmicon-cow'},
      { name: 'AREAS', component: AreaListPage, icon: 'ifarmicon-map' },
      { name: 'VEHICLES', component: VehicleListPage, icon: 'ifarmicon-tractor' },
      { name: 'SETTINGS', component: ListPage, icon: 'ifarmicon-cogs' },
      { name: 'EVENTS', component: EventListPage, icon: 'ifarmicon-event' }
    ];
  }

}
