import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalExameService } from '../../services/domain/localExame.service';

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
              public localExameService:LocalExameService) {
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

}
