import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  @Input()textTitle: string;
  numberNotMessageByPaciente:number;

  constructor(private events:Events) {
    this.events.subscribe('number-not-read-message:refresh',numberNotMessageByPaciente =>{
      this.numberNotMessageByPaciente = numberNotMessageByPaciente;
    })
  }

}
