import { MedicamentoService } from './../../services/domain/medicamento.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MedicamentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medicamentos',
  templateUrl: 'medicamentos.html',
})
export class MedicamentosPage {

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public medicamentoService:MedicamentoService) {
  }

  ionViewDidLoad() {
    this.obterMedicamentos()
  }
  obterMedicamentos(){
    this.medicamentoService.findMedicamentosByPacienteId()
    .subscribe(res=>{
      console.log(res)
    })
  }

}
