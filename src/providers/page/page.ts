import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HomePage} from '../../pages/home/home';
import {AnimalListPage} from '../../pages/animal-list/animal-list';
import {AreaListPage} from '../../pages/area-list/area-list';
import {VehicleListPage} from '../../pages/vehicle-list/vehicle-list';
import {ListPage} from '../../pages/list/list';

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

  getPages (): Array<{title: string, component: any, icon: string}> {
    return [
      { title: 'Home', component: HomePage, icon: 'ion-ios-home'},
      { title: 'Tiere', component: AnimalListPage, icon: 'ifarmicon-cow'},
      { title: 'Flächen', component: AreaListPage, icon: 'ifarmicon-map' },
      { title: 'Fahrzeuge', component: VehicleListPage, icon: 'ifarmicon-tractor' },
      { title: 'Einstellungen', component: ListPage, icon: 'ifarmicon-cogs' }
    ];
  }

}
