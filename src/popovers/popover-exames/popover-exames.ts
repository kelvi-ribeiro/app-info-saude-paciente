
import {NavParams, ViewController} from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'popover-exames.html',
})
export class PopoverExamesPage {
  navCtrl;
  exame;
  examePage: any;

  constructor(
    public navParams:NavParams,
    public viewCtrl:ViewController,
    ) {
    this.examePage = this.navParams.get('examePage');
    this.exame = this.navParams.get('exame')
}

  close() {
    this.viewCtrl.dismiss();
  }

  editarExame(){
    this.close()
    this.navCtrl.push('FormExamePage',{exame:this.exame})
  }
  deletarExame(){
    this.examePage.alertApagarExame(this.exame)
  }
  localizarExame(){
    this.close()
    this.examePage.navCtrl.push('MapaLocalizacaoExamesPage',{exame:this.exame})
  }
}
