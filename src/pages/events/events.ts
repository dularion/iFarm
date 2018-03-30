import {Component, Input} from '@angular/core';

@Component({
  selector: 'ifarm-events',
  templateUrl: 'events.html'
})
export class IFarmEvents {
  selectedItem: any;
  isCreatingNewEvent: boolean = false;

  @Input() item: number;

  constructor() {
  }

}
