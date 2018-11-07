import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';

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
  numberNotMessageByPaciente = this.storageService.getNumberNotMessageByPaciente();

  constructor(
    private events:Events,
    private storageService:StorageService
    ) {
    this.events.subscribe('number-not-read-message:refresh',numberNotMessageByPaciente =>{
      this.numberNotMessageByPaciente = numberNotMessageByPaciente;
    })
  }

}