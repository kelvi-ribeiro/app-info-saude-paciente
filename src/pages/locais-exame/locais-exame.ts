import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalExameService } from '../../services/domain/localExame.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the LocaisExamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-locais-exame',
  templateUrl: 'locais-exame.html',
})
export class LocaisExamePage {
  locaisExame;
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public localExameService:LocalExameService,
              public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
  this.obterLocaisExame()
  }
  obterLocaisExame(){
    this.localExameService.findAllLocaisExameByPacienteId()
    .subscribe(res=>{
      this.locaisExame = res
    })
  }
  atualizar(localExame){
    this.navCtrl.push('FormLocalExamePage',{localExame:localExame})
  }

  alertApagarLocalExame(localExame) {
    let alert = this.alertCtrl.create({
      title: "Atenção!",
      message: "Esta ação irá apagar este local de exame e todos exames nele associados, tem certeza disso  ?",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.apagarLocalExame(localExame)
          }
        },
        {
          text: "Não"
        }
      ]
    });
    alert.present();
  }
  apagarLocalExame(localExame){
    this.localExameService.delete(localExame.id)
    .subscribe(res => {
      this.obterLocaisExame();
    })
  }


}
