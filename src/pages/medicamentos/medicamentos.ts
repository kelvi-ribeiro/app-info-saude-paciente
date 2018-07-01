import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { MedicamentoService } from './../../services/domain/medicamento.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';

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
  medicamentos;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public medicamentoService:MedicamentoService,
              public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    this.obterMedicamentosAtivos()
  }
  obterMedicamentosAtivos(){
    this.medicamentoService.findMedicamentosAtivosByPacienteId()
    .subscribe(res=>{
      this.medicamentos = res;
      console.log(res)
    })
  }
  atualizar(medicamento){
    this.navCtrl.push('FormMedicamentoPage',{medicamento:medicamento})
  }
  alertApagarMedicamento(medicamento) {
    let alert = this.alertCtrl.create({
      title: "Atenção!",
      message: "Essa Ação irá mandar esse medicamento para a lita de histórico, tem certeza disso ?",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.setInativo(medicamento);
          }
        },
        {
          text: "Não"
        }
      ]
    });
    alert.present();
  }
  setInativo(medicamento){
    this.medicamentoService.setInativo(medicamento.id)
    .subscribe(res=>{
      this.obterMedicamentosAtivos();
    })
  }

}
