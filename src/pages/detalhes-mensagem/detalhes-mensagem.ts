import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetalhesMensagemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes-mensagem',
  templateUrl: 'detalhes-mensagem.html',
})
export class DetalhesMensagemPage {
  mensagem;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.mensagem = this.navParams.get("mensagem");
    if (!this.mensagem) {
      this.navCtrl.setRoot('HomePage')
      return;
    }    
    //this.mensagem.conteudoMensagem = this.mensagem.conteudoMensagem.replace(/width/g, "'width'");
  }
  exibirTipoMensagem(){
    if(this.mensagem.linhaCuidado){
      return `Linha de cuiado de ${this.mensagem.linhaCuidado.nome}`
    }else if(this.mensagem.paciente){
      return 'Individual'
    }else{
      return 'Global'
      }
    }

}
