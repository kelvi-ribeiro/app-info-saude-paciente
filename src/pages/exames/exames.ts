import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ExameService } from './../../services/domain/exame.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopoverExamesPage } from '../../popovers/popover-exames/popover-exames';



/**
 * Generated class for the ExamesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exames',
  templateUrl: 'exames.html',
})
export class ExamesPage {
  exames;
  carregou = false;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public exameService:ExameService,
              public alertCtrl:AlertController,
              public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    this.obterExames()
  }
  obterExames(){
    return this.exameService.findExamesByPacienteId()
    .then(res=>{
      this.exames = res;
      this.carregou = true;

    })
    .catch(() =>{
      this.carregou = true;

    })
  }
  atualizar(exame){
    this.navCtrl.push('FormExamePage',{exame:exame})
  }
  alertApagarExame(exame) {
    let alert = this.alertCtrl.create({
      title: "Atenção!",
      message: "Esta ação irá apagar esse exame, Tem certeza disso ?",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.apagarExame(exame)
          }
        },
        {
          text: "Não"
        }
      ]
    });
    alert.present();
  }
  apagarExame(exame){
    this.exameService.delete(exame.id)
    .then(res =>{
      this.obterExames()
    })
  }
   doRefresh(refresher){
      this.obterExames().then(()=>{
      refresher.complete();
      });
  }
  presentPopover(myEvent,exame) {
    const popover = this.popoverCtrl.create(PopoverExamesPage,{examePage:this,exame:exame});
    popover.present({
      ev: myEvent
    });
  }
}
