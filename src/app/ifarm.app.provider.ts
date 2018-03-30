import {Injectable} from '@angular/core';
import {HomePage} from '../pages/home/home';
import {AnimalsPage} from '../pages/animals/animals';
import {ListPage} from '../pages/list/list';

@Injectable()
export class IFarmProvider {
  getPages (): Array<{title: string, component: any, icon: string}> {
    return [
      { title: 'Home', component: HomePage, icon: 'ion-ios-home'},
      { title: 'Tiere', component: AnimalsPage, icon: 'ifarmicon-cow'},
      { title: 'Flächen', component: AnimalsPage, icon: 'ifarmicon-map' },
      { title: 'Fahrzeuge', component: ListPage, icon: 'ifarmicon-tractor' },
      { title: 'Einstellungen', component: ListPage, icon: 'ifarmicon-cogs' }
    ];
  }
}
