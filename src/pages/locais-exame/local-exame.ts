import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ActionSheetController } from 'ionic-angular';
import { LocalExameService } from '../../services/domain/localExame.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


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
              public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidEnter() {
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
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({          
      buttons: [
        {
          text: 'Adicionar Local de exame',
          icon:'pin',           
          handler: () => {
            this.navCtrl.push('FormLocalExamePage')
          }
        },        
                      
        {
          text: 'Cancelar',            
          icon:'close',  
          handler: () => {
            
          }
        }
      ]
    });
    actionSheet.present();
  }
}
