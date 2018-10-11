import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Slides } from 'ionic-angular';
import { LocalExameService } from '../../services/domain/localExame.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { PopoverDefaultPage } from '../../popovers/popover-default/popover-default';

/**
 * Generated class for the LocaisExamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-local-exame',
  templateUrl: 'local-exame.html',
})
export class LocalExamePage {
  locaisExame = [];
  carregou: boolean = false;
  @ViewChild('slidesLocaisExames') slidesLocaisExames: Slides;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public service:LocalExameService,
              public alertCtrl:AlertController,
              public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
  this.obterLocaisExame()
  }
  obterLocaisExame(){
    this.service.findAllLocaisExameByPacienteId()
    .then(res=>{
      this.locaisExame = res;
      this.carregou = true;
    })
  }
  atualizar(localExame){
    this.navCtrl.push('FormLocalExamePage',{localExame:localExame})
  }

  alertApagar(localExame) {
    let alert = this.alertCtrl.create({
      title: "Atenção!",
      message: "Esta ação irá apagar este local de exame e todos exames nele associados, tem certeza disso  ?",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.apagar(localExame)
          }
        },
        {
          text: "Não"
        }
      ]
    });
    alert.present();
  }
  apagar(localExame){
    this.service.delete(localExame.id)
    .then(res => {
      this.obterLocaisExame();
    })
  }

  presentPopover(myEvent,item) {
    const popover = this.popoverCtrl.create(PopoverDefaultPage,{page:this,item:item});
    popover.present({
      ev: myEvent
    });
  }


}
