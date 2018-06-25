import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MedicamentoService } from '../../services/domain/medicamento.service';

/**
 * Generated class for the HistoricoMedicamentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historico-medicamentos',
  templateUrl: 'historico-medicamentos.html',
})
export class HistoricoMedicamentosPage {

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public medicamentoService:MedicamentoService) {
  }

  ionViewDidLoad() {
    this.obterMedicamentosInativos()
  }
  obterMedicamentosInativos(){
    this.medicamentoService.findMedicamentosInativosByPacienteId()
    .subscribe(res=>{
      console.log(res)
    })
  }

}
