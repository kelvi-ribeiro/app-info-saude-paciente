import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { InteracaoService } from '../../services/domain/interacao.service';


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
    private events:Events
    ) {

  }

  ionViewDidLoad() {
    this.mensagem = this.navParams.get("mensagem");
    if (!this.mensagem) {
      this.navCtrl.setRoot('HomePage')
      return;
    }    
    this.setMensagemVisto()
    
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
        .then(()=>{
          this.mensagem.mensagemLida = true
          this.events.publish('take-number-not-read-messages')
        })
              
      }
     
    }
}
