import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { MedicamentoService } from './../../services/domain/medicamento.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, PopoverController } from 'ionic-angular';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { PopoverDefaultPage } from '../../popovers/popover-default/popover-default';



@IonicPage()
@Component({
  selector: 'page-medicamento',
  templateUrl: 'medicamento.html',
})
export class MedicamentoPage {
  medicamentos;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public service:MedicamentoService,
              public alertCtrl:AlertController,
              public notificaoesService:NotificacoesService,
              public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    this.obterMedicamentosAtivos()
  }
  obterMedicamentosAtivos(){
    this.service.findMedicamentosAtivosByPacienteId()
    .then(res=>{
      this.medicamentos = res;
    })
  }
  atualizar(medicamento){
    this.navCtrl.push('FormMedicamentoPage',{medicamento:medicamento})
  }

  setInativo(medicamento){
    this.service.setInativo(medicamento.id)
    .then(res=>{
      this.obterMedicamentosAtivos();
      this.notificaoesService.presentToast('Medicamento mandado para a lista de histórico','default',4000,'middle')
    })
  }

  presentPopover(myEvent,item) {
    const popover = this.popoverCtrl.create(PopoverDefaultPage,{page:this,item:item});
    popover.present({
      ev: myEvent
    });
  }

}
