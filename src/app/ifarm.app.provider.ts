import {Injectable} from '@angular/core';
import {HomePage} from '../pages/home/home';
import {AnimalListPage} from '../pages/animal-list/animal-list';
import {ListPage} from '../pages/list/list';
import {AreaListPage} from '../pages/area-list/area-list';
import {VehicleListPage} from '../pages/vehicle-list/vehicle-list';

@Injectable()
export class IFarmProvider {
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
