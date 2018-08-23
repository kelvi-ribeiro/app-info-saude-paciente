import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { MedicamentoService } from '../../services/domain/medicamento.service';
import { PopoverDefaultPage } from '../../popovers/popover-default/popover-default';


@IonicPage()
@Component({
  selector: 'page-historico-medicamentos',
  templateUrl: 'historico-medicamento.html',
})
export class HistoricoMedicamentoPage {
  medicamentos;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public service:MedicamentoService,
              public alertCtrl:AlertController,
              public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    this.obterMedicamentosInativos()
  }
  obterMedicamentosInativos(){
    this.service.findMedicamentosInativosByPacienteId()
    .then(res=>{
      this.medicamentos = res;
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
  apagar(medicamento){
    this.service.delete(medicamento.id)
    .then(res =>{
      this.obterMedicamentosInativos()
    })


  }
  setAtivo(medicamento){
    this.service.setAtivo(medicamento.id)
    .then(res=>{
      this.obterMedicamentosInativos();
    })
  }
  presentPopover(myEvent,item) {
    const popover = this.popoverCtrl.create(PopoverDefaultPage,{page:this,item:item});
    popover.present({
      ev: myEvent
    });
  }
}
