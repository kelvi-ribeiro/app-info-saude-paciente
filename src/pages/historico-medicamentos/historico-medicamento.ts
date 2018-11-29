import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MedicamentoService } from '../../services/domain/medicamento.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';


@IonicPage()
@Component({
  selector: 'page-historico-medicamento',
  templateUrl: 'historico-medicamento.html',
})
export class HistoricoMedicamentoPage {
  medicamentos;
  carregou:boolean = false
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public service:MedicamentoService,
              public alertCtrl:AlertController,
              public notificacoesService:NotificacoesService) {
  }

  ionViewDidLoad() {
    this.obterMedicamentosInativos()
  }
  obterMedicamentosInativos(){
    this.service.findMedicamentosInativosByPacienteId()
    .then(res=>{
      this.medicamentos = res;
      this.carregou = true;
    })
  }

  alertApagar(medicamento) {
    let alert = this.alertCtrl.create({
      title: "Atenção!",
      message: "Esta ação irá apagar o medicamento, tem certeza disso ?",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.apagar(medicamento)
          }
        },
        {
          text: "Não"
        }
      ]
    });
    alert.present();
  }
  alertRestaurarMedicamento(medicamento) {
    let alert = this.alertCtrl.create({
      title: "Atenção!",
      message: "Esta ação irá restaurar o medicamento, deseja mesmo fazer isso ?",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.setAtivo(medicamento)
          }
        },
        {
          text: "Não"
        }
      ]
    });
    alert.present();
  }
  apagar(medicamento){
    this.service.delete(medicamento.id)
    .then(() =>{
      this.refreshPage()
    })

  }
  
  refreshPage(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);    
  }
  setAtivo(medicamento){
    this.service.setAtivo(medicamento.id)
    .then(()=>{      
      this.refreshPage()
      this.obterMedicamentosInativos();
    })
  }  
}
