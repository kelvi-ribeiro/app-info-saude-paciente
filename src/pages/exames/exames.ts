import { ExameService } from './../../services/domain/exame.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public exameService:ExameService) {
  }

  ionViewDidLoad() {
    this.obterExames()
  }
  obterExames(){
    this.exameService.findExamesByPacienteId()
    .subscribe(res=>{
      this.exames = res;
    })
  }
  atualizar(exame){
    this.navCtrl.push('FormExamePage',{exame:exame})
  }
}
