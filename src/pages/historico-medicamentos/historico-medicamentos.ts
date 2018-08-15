import { AlertController } from 'ionic-angular/components/alert/alert-controller';
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
  medicamentos;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public medicamentoService:MedicamentoService,
              public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    this.obterMedicamentosInativos()
  }
  obterMedicamentosInativos(){
    this.medicamentoService.findMedicamentosInativosByPacienteId()
    .then(res=>{
      this.medicamentos = res;
    })
  }

  alertApagarMedicamento(medicamento) {
    let alert = this.alertCtrl.create({
      title: "Atenção!",
      message: "Esta ação irá apagar o medicamento, tem certeza disso ?",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.apagarMedicamento(medicamento)
          }
        },
        {
          text: "Não"
        }
      ]
    });
    alert.present();
  }
  apagarMedicamento(medicamento){
    this.medicamentoService.delete(medicamento.id)
    .then(res =>{
      this.obterMedicamentosInativos()
    })


  }
  setAtivo(medicamento){
    this.medicamentoService.setAtivo(medicamento.id)
    .then(res=>{
      this.obterMedicamentosInativos();
    })

  }
}
