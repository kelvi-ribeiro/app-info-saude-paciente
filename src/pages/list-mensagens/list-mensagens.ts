import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MensagemService } from '../../services/domain/mensagem.service';
import { InteracaoService } from '../../services/domain/interacao.service';

/**
 * Generated class for the ListMensagensPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-mensagens',
  templateUrl: 'list-mensagens.html',
})
export class ListMensagensPage {
  mensagens = [];
  carregou = false

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public mensagemService:MensagemService,
              public intercaoService:InteracaoService) {
  }

  ionViewDidEnter() {
    this.findAll()
  }
  findAll(){
    return this.mensagemService.findAllPageableByPaciente(0)
    .then(res =>{
      this.mensagens = res.content;
      this.carregou = true
    }).catch(() => {
      this.carregou = true
    })
  }
  exibirTipoMensagem(mensagem){
    if(mensagem.linhaCuidadoId){
      return `Linha de cuiado de ${mensagem.nomeLinhaCuidado}`
    }else if(mensagem.pacienteId){
      return 'Individual'
    }else{
      return 'Global'
      }
    }
    goToDetalhes(mensagem) {
      this.navCtrl.push('DetalhesMensagemPage', { mensagem: mensagem });
    }
    doRefresh(refresher){
      this.findAll().then(()=>{
        refresher.complete();
      });
    }
  }

