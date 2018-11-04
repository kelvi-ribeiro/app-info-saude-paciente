import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InteracaoService } from '../../services/domain/interacao.service';

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
    public navParams: NavParams,
    private interacaoService:InteracaoService,
    ) {

  }

  ionViewDidLoad() {
    this.mensagem = this.navParams.get("mensagem");
    if (!this.mensagem) {
      this.navCtrl.setRoot('HomePage')
      return;
    }    
    this.setMensagemVisto()
    //this.mensagem.conteudoMensagem = this.mensagem.conteudoMensagem.replace(/width/g, "'width'");
  }
  exibirTipoMensagem(){
    if(this.mensagem.linhaCuidadoId){
      return `Linha de cuiado de ${this.mensagem.nomeLinhaCuidado}`
    }else if(this.mensagem.pacienteId){
      return 'Individual'
    }else{
      return 'Global'
      }
    }
    setMensagemVisto(){
      if(!this.mensagem.mensagemLida){
        this.interacaoService.insert(this.mensagem.id)        
      }
     
    }
}
